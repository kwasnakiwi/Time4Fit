import { useState } from 'react';
import './../styles/SignUp.css';
import logo from './../assets/images/appLogo.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Login(){
  // const BASE_URL = 'http://217.154.252.37';

  const [showPassword, setShowPassword] = useState(false);

  return(
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <Link to='/register'><button className="change-sign-up">Rejestracja</button></Link>
          </div>
          <h1 className="title">Logowanie</h1>
            <div className="inputs">
              <div className="input-box">
                <label className="sign-up-label">E-mail</label><br />
                <input type="text" className="sign-up-input" id='emaiInput'/>
              </div>
              <div className="input-box">
                <label className="sign-up-label">Hasło</label><br />
                <div className="password-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="sign-up-input" 
                    id='password-input' 
                    minLength="8" 
                    required
                  />
                  <span 
                    className="toggle-password" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
            </div>
            <div className="forgot-password-box">
              <Link to="/forgot-password" className='forgot-password'>Zapomniałem hasła</Link>
            </div>
            <button className="sign-up-btn">ZALOGUJ</button>
        </div>
      </div>
    </>
  )
}

export default Login