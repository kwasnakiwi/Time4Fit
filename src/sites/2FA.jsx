import logo from './../assets/images/appLogo.png';
import './../styles/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ENDPOINTS } from '../utils/Endopoints.jsx';
import { BASE_URL } from '../utils/Endopoints.jsx';

function TwoFA(){
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const challenge_id = localStorage.getItem("challenge_id");
  const purpose = localStorage.getItem("purpose");

  const handleLogin = async () => {
    setError('');

    if(!code){
      setError("Wpisz kod z E-maila");
      return;
    }

    try{
      const response = await fetch(`${BASE_URL}${ENDPOINTS.otpVerify}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({challenge_id, purpose, code}),
      });

      let data;

      try{
        data = await response.json();
      }
      catch{
        data = null;
      }

      if(!response.ok){
        const backendMsg = 'Coś nie powiodło się przy logowaniu.';
        throw new Error(backendMsg);
      }

      const refresh = data?.refresh;
      const access = data?.refresh;

      localStorage.removeItem("purpose");
      localStorage.removeItem("challenge_id");

      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);

      navigate('/home-page');
    }
    catch(err){
      setError("Błąd logowania");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return(
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <Link to='/'><button className="change-sign-up">Logowanie</button></Link>
          </div>
          <h1 className='title'>Logowanie</h1>
          <p className='description'>
            Wpisz kod wysłany na podany adres E-mail
          </p>
          <div className='inputs'>
            <input
              type="text" 
              id="codeForPasswordResetInput"
              value={code}
              onChange={(e) => {setCode(e.target.value)}}
              required
              onKeyDown={onKeyDown}
            />
          </div>
          <button className="sign-up-btn" onClick={handleLogin}>ZALOGUJ</button>
          <div className="forgot-password-box">
            <Link to="/login" className='forgot-password'>Wyślij ponownie</Link>
          </div>
        </div>
      </div>
    </>    
  )
}

export default TwoFA