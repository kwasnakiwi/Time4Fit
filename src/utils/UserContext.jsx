import { createContext, useEffect, useState } from "react";
import { apiFetch } from "../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "./Endopoints";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await apiFetch(`${BASE_URL}${ENDPOINTS.me}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMe(data);
      console.log("me:", data)
    } 
    catch {
      setMe(null);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <UserContext.Provider value={{ me, loading, refetchMe: fetchMe }}>
      {children}
    </UserContext.Provider>
  );
};
