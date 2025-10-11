import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect, useContext } from "react";
import { Icon } from "leaflet";
import locIcon from "./../../../assets/images/location-pin.png";
import "./../../../styles/mainpage.css";
import "leaflet/dist/leaflet.css";
import { LocationContext } from "../../../utils/LocationContext";

const customMarker = new Icon({
  iconUrl: locIcon,
  iconSize: [38, 38],
});

function Map({ city, street, postial, streetNumber, setCity, setStreet, setPostial, setStreetNumber }) {
  const [position, setPosition] = useState(null);
  const [manual, setManual] = useState(false);
  const { setLat, setLng } = useContext(LocationContext);

  // 🔹 szukanie współrzędnych po wpisaniu adresu
  useEffect(() => {
  async function fetchCoords() {
    if (manual) return; // jeśli użytkownik kliknął ręcznie, nie ruszamy
    if (!city) return;  // wymagamy przynajmniej miasta

    // 🔹 budujemy zapytanie z uwzględnieniem ulicy, numeru i kodu
    let query = "";
    if (street) {
      query = `${street}${streetNumber ? " " + streetNumber : ""}, ${city}${postial ? " " + postial : ""}`;
    } else if (postial) {
      query = `${postial} ${city}`;
    } else {
      query = city;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&accept-language=pl&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
        setLat(lat);
        setLng(lon);
      }
    } catch (err) {
      console.error("Błąd pobierania współrzędnych:", err);
    }
  }

  fetchCoords();

  // 🔹 każda zmiana inputów resetuje tryb manualny
  if (manual) {
    setManual(false);
  }
}, [city, street, streetNumber, postial]); // 🟢 dodaj streetNumber tutaj!


  // 🔹 kliknięcie w mapę → manualny marker + reverse geocoding
  function LocationMarker() {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setLat(lat);
        setLng(lng);
        setPosition([lat, lng]);
        setManual(true); // przejście w tryb ręczny

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pl`
          );
          const data = await res.json();

          if (data.address) {
            setStreet(data.address.road || "");
            setStreetNumber(data.address.house_number || ""); 
            setCity(
              data.address.city || data.address.town || data.address.village || ""
            );
            setPostial(data.address.postcode || "");
          } else {
            console.warn("Brak adresu dla tego punktu");
          }
        } catch (err) {
          console.error("Błąd reverse geocoding:", err);
        }
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customMarker}>
        <Popup>
          {street || "Brak ulicy"} {streetNumber ? ` ${streetNumber}` : ""}, {city || "Brak miasta"} <br />
          Kod: {postial || "brak"} <br />
          Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
        </Popup>
      </Marker>
    );
  }

  // 🔹 centrowanie mapy na markerze
  function RecenterOnPosition({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 16);
      }
    }, [position, map]);
    return null;
  }

  return (
    <MapContainer center={[52.2297, 21.0122]} zoom={16} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
      />
      <LocationMarker />
      <RecenterOnPosition position={position} />
    </MapContainer>
  );
}

export default Map;