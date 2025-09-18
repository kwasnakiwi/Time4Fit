import { useState } from 'react';
import './../../styles/SignUp.css';
import logo from './../../assets/images/appLogo.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../../utils/Endopoints.jsx';
import { BASE_URL } from '../../utils/Endopoints.jsx';


function Register(){
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const handleRegister = async () => {
    setError('');

    if(!name || !lastname || !phoneNumber || !email || !password || !repeatedPassword){
      setError('Wpisz wszystkie informacje');
      return;
    }
    if(password !== repeatedPassword){
      setError('Hasło musi być takie samo')
    }

    try{
      const response = await fetch(`${BASE_URL}${ENDPOINTS.register}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'email': email, 
                              'password': password, 
                              'first_name': name, 
                              'last_name': lastname, 
                              'phone_number': phoneNumber}),
      });

      let data;

      try{
        data = await response.json();
      }
      catch{
        data = null;
      }

      if(!response.ok){
        const backendMsg = 'Coś nie powiodło się przy rejestracji.';
        throw new Error(backendMsg);
      }

      const challenge_id = data?.challenge_id;
      const purpose = data?.purpose;

      localStorage.setItem("challenge_id", challenge_id);
      localStorage.setItem("purpose", purpose);

      navigate('/login');
    }
    catch(err){
      setError("Błąd przy rejestracji");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') handleRegister();
  };

  return(
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <Link to='/'><button className="change-sign-up">Logowanie</button></Link>
          </div>
          <h1 className="title">Rejestracja</h1>
          <div className="inputs">
            <div className="input-box big-box">
              <div className='mini-box'>
                <label className="sign-up-label">Imię</label><br />
                <input
                  type="text" 
                  className="sign-up-input" 
                  id='nameInput' 
                  required
                  value={name}
                  onKeyDown={onKeyDown}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mini-box">
                <label className="sign-up-label">Nazwisko</label><br />
                <input
                  type="text" 
                  className="sign-up-input" 
                  id='surnameInput' 
                  required
                  value={lastname}
                  onKeyDown={onKeyDown}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>
            <div className="input-box">
              <label className="sign-up-label">Nr. Telefonu</label><br />
              <input
                type="tel" 
                className="sign-up-input" 
                id='emaiInput' 
                required
                value={phoneNumber}
                onKeyDown={onKeyDown}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autoComplete='tel'
              />
            </div>
            <div className="input-box">
              <label className="sign-up-label">E-mail</label><br />
              <input
                type="email" 
                className="sign-up-input" 
                id='emaiInput' 
                required
                value={email}
                onKeyDown={onKeyDown}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
              />
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
              <label className="sign-up-label">Powtórz hasło</label><br />
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="sign-up-input" 
                  id='repeatPassword-input' 
                  minLength="8" 
                  required
                  value={repeatedPassword}
                  onKeyDown={onKeyDown}
                  onChange={(e) => setRepeatedPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="sign-up-btn" onClick={handleRegister}>ZAREJESTRUJ</button>
        </div>
      </div>
    </>
  )
}

export default Register