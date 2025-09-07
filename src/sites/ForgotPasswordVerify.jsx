import logo from './../assets/images/appLogo.png';
import './../styles/SignUp.css';
import { Link } from 'react-router-dom';
import { BASE_URL, ENDPOINTS } from '../utils/Endopoints';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ForgotPasswordVerify(){
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const challenge_id = localStorage.getItem("challenge_id");
  const purpose = localStorage.getItem("purpose");

  const handleResetPassword = async () => {
    setError('');

    if(!code){
      setError("Wpisz kod z E-maila");
      return;
    }

    try{
      const response = await fetch(`${BASE_URL}${ENDPOINTS.otpVerify}`, {
        method: 'POST',
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

      const reset_ticket_id = data?.reset_ticket_id;

      localStorage.removeItem("purpose");
      localStorage.removeItem("challenge_id");

      localStorage.setItem('reset_ticket_id', reset_ticket_id);

      navigate('/forgot-password/change-password');
    }
    catch(err){
      setError(err)
    }
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter') handleResetPassword() 
  }

  return(
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <Link to='/'><button className="change-sign-up">Logowanie</button></Link>
          </div>
          <h1 className='title'>Zapomniałem hasła</h1>
          <p className='description'>
            Wprowadź kod wysłany na podany adres email
          </p>
          <div className='inputs'>
            <input 
              type="text" 
              id="codeForPasswordResetInput" 
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete='none'
            />
          </div>
          <div className="forgot-password-box">
            <Link to="/forgot-password" className='forgot-password'>Wyślij ponownie</Link>
          </div>
          <button className="sign-up-btn" onClick={handleResetPassword}>PRZYWRÓĆ HASŁO</button>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordVerify