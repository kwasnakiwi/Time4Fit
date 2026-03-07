import logo from "./../../assets/images/appLogo.png";
import "./../../styles/SignUp.css";
import { Link } from "react-router-dom";
import { BASE_URL, ENDPOINTS } from "../../utils/Endopoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ForgotPasswordVerify from "./ForgotPasswordVerify";
import ChangePassword from "./ChangePassword";

function ForgotPassword({ isVerify, isReset }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [purpose, setPurpose] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [resetTicketId, setResetTicketId] = useState("");

  const handleResetPassword = async (email) => {
    setError("");

    if (!email) {
      setError("Podaj adres email");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}${ENDPOINTS.resetPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data;

      try {
        data = await response.json();
        console.log(data);
      } catch {
        data = null;
      }

      if (!response.ok) {
        const backendMsg = "Coś nie powiodło się przy resecie hasła.";
        throw new Error(backendMsg);
      }

      setPurpose(data?.purpose);
      setChallengeId(data?.challenge_id);

      navigate("/zapomnialem-hasla/weryfikacja");
    } catch (err) {
      setError(err);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleResetPassword(email);
  };

  const renderContent = () => {
    if (isReset) {
      return <ChangePassword resetTicketId={resetTicketId} />;
    }
    if (isVerify) {
      return (
        <ForgotPasswordVerify
          retrySend={() => handleResetPassword(email)}
          purpose={purpose}
          challengeId={challengeId}
          resetTicketId={resetTicketId}
          setResetTicketId={setResetTicketId}
        />
      );
    }
    return (
      <>
        <div className="panel-top">
          <img src={logo} alt="App Logo" />
          <Link to="/">
            <button className="change-sign-up">Logowanie</button>
          </Link>
        </div>
        <h1 className="title">Zapomniałem hasła</h1>
        <p className="description">Wprowadź email</p>
        <div className="inputs">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="email"
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className="sign-up-btn"
          onClick={() => handleResetPassword(email)}
        >
          PRZYWRÓĆ HASŁO
        </button>
      </>
    );
  };

  return (
    <>
      <div className="main-container">
        <div className="panel">{renderContent()}</div>
      </div>
    </>
  );
}

export default ForgotPassword;
