import { createContext, useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "./Endopoints";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const isAtLoginPage = location.pathname === "/";

  // 1. Pobieranie danych zalogowanego użytkownika
  const fetchMe = useCallback(async () => {
    try {
      const res = await apiFetch(`${BASE_URL}${ENDPOINTS.me}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMe(data);
      return data;
    } catch {
      setMe(null);
      return null;
    }
  }, []);

  // 2. Funkcja wylogowania (Przywrócona!)
  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setMe(null);
    navigate("/");
  }, [navigate]);

  const privateRoutes = [
    "/profil/edycja",
    // zablokowane sciezki aplikacji
  ];

  const initAuth = useCallback(async () => {
    const refreshToken = localStorage.getItem("refresh");
    const currentPath = location.pathname;

    // Sprawdzamy, czy obecna ścieżka zaczyna się od którejś z prywatnych tras
    // (używamy startsWith, żeby obsłużyć podstrony typu /profil/edycja/haslo)
    const isPrivateRoute = privateRoutes.some((path) =>
      currentPath.startsWith(path),
    );

    // SCENARIUSZ 1: Brak tokena refresh
    if (!refreshToken) {
      setMe(null);
      setLoading(false);

      // Jeśli to prywatna trasa i nie ma tokena -> kierujemy na start "/"
      if (isPrivateRoute) {
        navigate("/");
      }
      return;
    }

    try {
      // 1. Weryfikacja tokena
      const verifyRes = await fetch(`${BASE_URL}${ENDPOINTS.verifyToken}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (!verifyRes.ok) throw new Error("Expired");

      // 2. Odświeżenie access
      const refreshRes = await fetch(`${BASE_URL}${ENDPOINTS.refresh}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!refreshRes.ok) throw new Error("Refresh failed");

      const { access } = await refreshRes.json();
      localStorage.setItem("access", access);

      const userData = await fetchMe();

      // SCENARIUSZ 2: Sukces logowania
      // Jeśli użytkownik jest na stronie logowania, ale ma sesję -> przenieś go do środka
      if (
        userData &&
        (currentPath === "/" ||
          currentPath === "/rejestracja" ||
          currentPath === "/logowanie" ||
          currentPath.startsWith("/zapomnialem-hasla"))
      ) {
        navigate("/strona-glowna");
      }
    } catch (err) {
      console.warn("Sesja nie mogła zostać odtworzona");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setMe(null);

      // Jeśli sesja padła na prywatnej trasie -> wyrzuć do logowania
      if (isPrivateRoute) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }, [fetchMe, location.pathname, navigate]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <UserContext.Provider
      value={{
        me,
        loading,
        isLoggedIn: !!me,
        refetchMe: fetchMe,
        logout, // Funkcja znów dostępna w całej aplikacji
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
