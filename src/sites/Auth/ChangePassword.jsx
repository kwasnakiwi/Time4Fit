import { useState } from 'react';
import './../../styles/SignUp.css';
import logo from './../../assets/images/appLogo.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../../utils/Endopoints.jsx';
import { BASE_URL } from '../../utils/Endopoints.jsx';
import { apiFetch } from '../../interceptor/interceptor.jsx';

function ChangePassword(){
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const reset_ticket_id = localStorage.getItem('reset_ticket_id');

  const handleChangePassword = async () => {
    setError('');

    if(!password || !repeatedPassword){
      setError('Wprowadź wszytskie informacje');
      return;
    }

    if(password !== repeatedPassword){
      setError('Hasła muszą być takie same');
      return;
    }

    try{
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.resetPasswordConfirm}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reset_ticket_id, password }),
      });

      let data;

      try{
        data = await response.json();
      }
      catch{
        data = null;
      }

      if(!response.ok){
        const backendMsg = 'Coś nie powiodło się przy zmianie hasła.';
        throw new Error(backendMsg);
      }

      const refresh = data?.refresh;
      const access = data?.refresh;

      localStorage.removeItem("reset_ticket_id")

      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);

      navigate('/home-page')
    }
    catch(err){
      setError(err);
    }
  };

  const onKeyDown = (e) => {
    if(e.key === 'Enter') handleChangePassword();
  }

  return (
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <Link to='/'><button className="change-sign-up">Logowanie</button></Link>
          </div>

          <h1 className="title">Zapomniałem hasła</h1>

          <p className="description">
            Wprowadź nowe hasło.
          </p>

          <div className="inputs">
            <div className="input-box">
              <label className="sign-up-label" htmlFor="email-input">Nowe hasło</label><br />
              <div className='password-wrapper'>
                <input
                  type={showPassword ? "text" : "password"}
                  className="sign-up-input"
                  id="email-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={onKeyDown}
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

            <div className="input-box">
              <label className="sign-up-label" htmlFor="password-input">Powtórz hasło</label><br />
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="sign-up-input"
                  id="password-input"
                  minLength={8}
                  required
                  value={repeatedPassword}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                  onKeyDown={onKeyDown}
                />
              </div>
            </div>
          </div>

          <div className="forgot-password-box">
            <Link to="/zapomnialem-hasla" className='forgot-password'>Zapomniałem hasła</Link>
          </div>

          <button
            className="sign-up-btn"
            onClick={handleChangePassword}
          >
            ZALOGUJ
          </button>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
