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

function Map({ city, street, postial, setCity, setStreet, setPostial }) {
  const [position, setPosition] = useState(null);
  const [manual, setManual] = useState(false);
  const { setLat, setLng } = useContext(LocationContext);

  // 🔹 szukanie współrzędnych po wpisaniu adresu
  useEffect(() => {
    async function fetchCoords() {
      if (manual) return; // jeśli jesteśmy w trybie ręcznym – nie ruszamy
      if (!city) return;  // wymagamy przynajmniej miasta

      let query = "";
      if (street) {
        query = `${street}, ${city}${postial ? " " + postial : ""}`;
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
          setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
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
  }, [city, street, postial]);

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
          {street || "Brak ulicy"}, {city || "Brak miasta"} <br />
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
        map.flyTo(position, 13);
      }
    }, [position, map]);
    return null;
  }

  return (
    <MapContainer center={[52.2297, 21.0122]} zoom={13} className="map">
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