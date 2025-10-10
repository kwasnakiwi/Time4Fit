import { createContext, useState } from "react";

export const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  return (
    <LocationContext.Provider value={{ lat, lng, setLat, setLng }}>
      {children}
    </LocationContext.Provider>
  );
}
