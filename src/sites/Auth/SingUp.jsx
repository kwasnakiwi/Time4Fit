import { useContext, useEffect, useState } from "react";
import "./../../styles/SignUp.css";
import logo from "./../../assets/images/appLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../utils/Endopoints.jsx";
import { BASE_URL } from "../../utils/Endopoints.jsx";
import { apiFetch } from "../../interceptor/interceptor.jsx";
import { UserContext } from "../../utils/UserContext.jsx";
import TwoFA from "./2FA.jsx";

function SignUp({ is2FA }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [purpose, setPurpose] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  const isRegister = location.pathname === "/rejestracja";

  const handleLogin = async (email, password) => {
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

      setPurpose(data?.purpose);
      setChallengeId(data?.challenge_id);

      navigate("/logowanie");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Nieznany błąd logowania.";
      setError(message);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleLogin(email, password);
  };

  const handleRegister = async (
    name,
    lastname,
    phoneNumber,
    email,
    password,
  ) => {
    setError("");

    if (
      !name ||
      !lastname ||
      !phoneNumber ||
      !email ||
      !password ||
      !repeatedPassword
    ) {
      setError("Wpisz wszystkie informacje");
      return;
    }
    if (password !== repeatedPassword) {
      setError("Hasło musi być takie samo");
    }

    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.register}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          first_name: name,
          last_name: lastname,
          phone_number: phoneNumber,
        }),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const backendMsg = "Coś nie powiodło się przy rejestracji.";
        throw new Error(backendMsg);
      }

      setChallengeId(data?.challenge_id);
      setPurpose(data?.purpose);

      navigate("/logowanie");
    } catch (err) {
      setError("Błąd przy rejestracji");
    }
  };
  // if (isLoading) return <h1>Ładowanie profilu...</h1>;

  return (
    <>
      <div className="main-container">
        <div className="panel">
          {!is2FA ? (
            <>
              {!isRegister ? (
                <>
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
                          aria-label={
                            showPassword ? "Ukryj hasło" : "Pokaż hasło"
                          }
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
                  <button
                    className="sign-up-btn"
                    onClick={() => handleLogin(email, password)}
                  >
                    ZALOGUJ
                  </button>
                </>
              ) : (
                <>
                  <div className="panel-top">
                    <img src={logo} alt="App Logo" />
                    <Link to="/">
                      <button className="change-sign-up">Logowanie</button>
                    </Link>
                  </div>
                  <h1 className="title">Rejestracja</h1>
                  <div className="inputs">
                    <div className="input-box big-box">
                      <div className="mini-box">
                        <label className="sign-up-label">Imię</label>
                        <br />
                        <input
                          type="text"
                          className="sign-up-input"
                          id="nameInput"
                          required
                          value={name}
                          onKeyDown={onKeyDown}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mini-box">
                        <label className="sign-up-label">Nazwisko</label>
                        <br />
                        <input
                          type="text"
                          className="sign-up-input"
                          id="surnameInput"
                          required
                          value={lastname}
                          onKeyDown={onKeyDown}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="input-box">
                      <label className="sign-up-label">Nr. Telefonu</label>
                      <br />
                      <input
                        type="tel"
                        className="sign-up-input"
                        id="phoneInput"
                        required
                        value={phoneNumber}
                        onKeyDown={onKeyDown}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="input-box">
                      <label className="sign-up-label">E-mail</label>
                      <br />
                      <input
                        type="email"
                        className="sign-up-input"
                        id="emaiInput"
                        required
                        value={email}
                        onKeyDown={onKeyDown}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </div>
                    <div className="input-box">
                      <label className="sign-up-label">Hasło</label>
                      <br />
                      <div className="password-wrapper">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="sign-up-input"
                          id="password-input"
                          minLength="8"
                          required
                          value={password}
                          onKeyDown={onKeyDown}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          className="toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>
                    <div className="input-box">
                      <label className="sign-up-label">Powtórz hasło</label>
                      <br />
                      <div className="password-wrapper">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="sign-up-input"
                          id="repeatPassword-input"
                          minLength="8"
                          required
                          value={repeatedPassword}
                          onKeyDown={onKeyDown}
                          onChange={(e) => setRepeatedPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="sign-up-btn"
                    onClick={() =>
                      handleRegister(
                        name,
                        lastname,
                        phoneNumber,
                        email,
                        password,
                      )
                    }
                  >
                    ZAREJESTRUJ
                  </button>
                </>
              )}
            </>
          ) : (
            <TwoFA
              retrySend={
                isRegister
                  ? () =>
                      handleRegister(
                        name,
                        lastname,
                        phoneNumber,
                        email,
                        password,
                      )
                  : () => handleLogin(email, password)
              }
              challengeId={challengeId}
              purpose={purpose}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default SignUp;
