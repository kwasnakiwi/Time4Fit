import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import { Icon } from "leaflet";
import locIcon from "./../../../assets/images/location-pin.png";
import "./../../../styles/mainpage.css";
import "leaflet/dist/leaflet.css";

const customMarker = new Icon({
  iconUrl: locIcon,
  iconSize: [38, 38],
});

function StaticMap({ lat, lng, city, street, postial, streetNumber }) {
  // 🔹 ustawiamy domyślne centrum, gdy nie ma jeszcze współrzędnych
  const position = lat && lng ? [lat, lng] : [52.2297, 21.0122]; // Warszawa jako fallback

  useEffect(() => {
    if (!lat || !lng) {
      console.warn("⚠️ Brak współrzędnych dla mapy statycznej");
    }
  }, [lat, lng]);

  return (
    <MapContainer
      center={position}
      zoom={16}
      className="map"
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ pointerEvents: "none" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
      />

      {lat && lng && (
        <Marker position={[lat, lng]} icon={customMarker}>
          <Popup>
            {street || "Brak ulicy"}{" "}
            {streetNumber ? `${streetNumber}` : ""}, {city || "Brak miasta"} <br />
            Kod: {postial || "brak"} <br />
            Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default StaticMap;
