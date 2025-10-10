import { createContext, useState } from "react";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [eventData, setEventData] = useState({
    title: "",
    category: null,
    shortDesc: "",
    longDesc: "",
    date: "",
    time: "",
    duration: 60,
    city: "",
    street: "",
    postial: "",
  });

  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
}
