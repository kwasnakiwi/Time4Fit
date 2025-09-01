import { useState } from 'react';
import './../styles/SignUp.css';
import logo from './../assets/images/appLogo.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Register(){
  const [showPassword, setShowPassword] = useState(false);

  return(
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <Link to='/login'><button className="change-sign-up">Logowanie</button></Link>
          </div>
          <h1 className="title">Rejestracja</h1>
          <div className="inputs">
            <div className="input-box big-box">
              <div className='mini-box'>
                <label className="sign-up-label">Imię</label><br />
                <input type="text" className="sign-up-input" id='nameInput' required/>
              </div>
              <div className="mini-box">
                <label className="sign-up-label">Nazwisko</label><br />
                <input type="text" className="sign-up-input" id='surnameInput' required/>
              </div>
            </div>
            <div className="input-box">
              <label className="sign-up-label">Nr. Telefonu</label><br />
              <input type="tel" className="sign-up-input" id='emaiInput' required/>
            </div>
            <div className="input-box">
              <label className="sign-up-label">E-mail</label><br />
              <input type="email" className="sign-up-input" id='emaiInput' required/>
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
            <div className="input-box">
              <label className="sign-up-label">Powtórz hasło</label><br />
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="sign-up-input" 
                  id='repeatPassword-input' 
                  minLength="8" 
                  required
                />
              </div>
            </div>
          </div>
          <button className="sign-up-btn">ZAREJESTRUJ</button>
        </div>
      </div>
    </>
  )
}

export default Register