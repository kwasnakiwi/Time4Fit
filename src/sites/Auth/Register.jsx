import { useState } from "react";
import "./../../styles/SignUp.css";
import logo from "./../../assets/images/appLogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../utils/Endopoints.jsx";
import { BASE_URL } from "../../utils/Endopoints.jsx";

function Register({ is2FA }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const [purpose, setPurpose] = useState("");
  const [challengeId, setChallengeId] = useState("");

  

  return (
    <>
      <div className="main-container">
        <div className="panel">
          
        </div>
      </div>
    </>
  );
}

export default Register;
