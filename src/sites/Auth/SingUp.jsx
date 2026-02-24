import { useEffect, useState } from "react";
import "./../../styles/SignUp.css";
import logo from "./../../assets/images/appLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../utils/Endopoints.jsx";
import { BASE_URL } from "../../utils/Endopoints.jsx";
import { apiFetch } from "../../interceptor/interceptor.jsx";

function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  useEffect(() => {
    const verifyToken = async () => {
      if (!access || !refresh) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}${ENDPOINTS.verifyToken}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: access }),
        });

        let data;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(data?.error);
        }
        console.log(data);
        setIsLoading(false)
        navigate(`/strona-glowna`);
      } catch (err) {
        console.log(err);
      }
    };

    verifyToken();
  }, []);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Wpisz email i hasło.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.login}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const backendMsg =
          data?.message ||
          data?.detail ||
          "Coś nie powiodło się przy logowaniu.";
        throw new Error(backendMsg);
      }

      const purpose = data?.purpose;
      const challengeId = data?.challenge_id;

      localStorage.setItem("purpose", String(purpose));
      localStorage.setItem("challenge_id", String(challengeId));

      navigate("/logowanie");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Nieznany błąd logowania.";
      setError(message);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  if (isLoading) return <h1>Ładowanie profilu...</h1>

  return (
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <Link to="/rejestracja">
              <button className="change-sign-up">Rejestracja</button>
            </Link>
          </div>

          <h1 className="title">Logowanie</h1>

          <div className="inputs">
            <div className="input-box">
              <label className="sign-up-label" htmlFor="email-input">
                E-mail
              </label>
              <br />
              <input
                type="email"
                className="sign-up-input"
                id="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="email"
              />
            </div>

            <div className="input-box">
              <label className="sign-up-label" htmlFor="password-input">
                Hasło
              </label>
              <br />
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="sign-up-input"
                  id="password-input"
                  minLength={8}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>

          <div className="forgot-password-box">
            <Link to="/zapomnialem-hasla" className="forgot-password">
              Zapomniałem hasła
            </Link>
          </div>

          <button className="sign-up-btn" onClick={handleLogin}>
            ZALOGUJ
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
