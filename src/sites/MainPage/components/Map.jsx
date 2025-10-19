import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect, useContext, useRef } from "react";
import { Icon } from "leaflet";
import locIcon from "./../../../assets/images/location-pin.png";
import "./../../../styles/mainpage.css";
import "leaflet/dist/leaflet.css";
import { LocationContext } from "../../../utils/LocationContext";

const customMarker = new Icon({
  iconUrl: locIcon,
  iconSize: [38, 38],
});

function Map({
  city,
  street,
  postial,
  streetNumber,
  setCity,
  setStreet,
  setPostial,
  setStreetNumber,
  initialLat,
  initialLng,
}) {
  const [position, setPosition] = useState(null);
  const [manual, setManual] = useState(false);
  const { setLat, setLng } = useContext(LocationContext);
  const markerRef = useRef(null);

  // 🔹 ustaw marker z poprzednich współrzędnych (tryb edycji)
  useEffect(() => {
    if (initialLat && initialLng) {
      const lat = parseFloat(initialLat);
      const lon = parseFloat(initialLng);
      setPosition([lat, lon]);
      setLat(lat);
      setLng(lon);
    }
  }, [initialLat, initialLng, setLat, setLng]);

  // 🔹 szukaj współrzędnych po wpisaniu adresu
  useEffect(() => {
    async function fetchCoords() {
      if (manual) return;
      if (!city) return;

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
  }, [city, street, streetNumber, postial, manual]);

  // 🔹 Kliknięcie w mapę (manualny wybór)
  function LocationMarker() {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        setLat(lat);
        setLng(lng);
        setManual(true);

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=pl`
          );
          const data = await res.json();

          if (data.address) {
            setStreet(data.address.road || "");
            setStreetNumber(data.address.house_number || "");
            setCity(data.address.city || data.address.town || data.address.village || "");
            setPostial(data.address.postcode || "");
          }
        } catch (err) {
          console.error("Błąd reverse geocoding:", err);
        }
      },
    });

    return position ? (
      <Marker ref={markerRef} position={position} icon={customMarker}>
        <Popup autoOpen>
          {street || "Brak ulicy"} {streetNumber ? ` ${streetNumber}` : ""}, {city || "Brak miasta"} <br />
          Kod: {postial || "brak"} <br />
          Lat: {position[0].toFixed(5)}, Lng: {position[1].toFixed(5)}
        </Popup>
      </Marker>
    ) : null;
  }

  // 🔹 FlyTo — przesunięcie mapy, gdy zmieni się pozycja
  function RecenterMap({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 16, { animate: true, duration: 0. });
      }
    }, [position, map]);
    return null;
  }

  return (
    <MapContainer
      center={[52.2297, 21.0122]} // zawsze start z Warszawy, bez zmiany
      zoom={16}
      className="map"
      scrollWheelZoom
      doubleClickZoom
      dragging
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
      />
      <LocationMarker />
      <RecenterMap position={position} />
    </MapContainer>
  );
}

export default Map;
