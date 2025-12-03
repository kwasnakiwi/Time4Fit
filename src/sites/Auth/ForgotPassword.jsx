import logo from './../../assets/images/appLogo.png';
import './../../styles/SignUp.css';
import { Link } from 'react-router-dom';
import { BASE_URL, ENDPOINTS } from '../../utils/Endopoints';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ForgotPassword(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    setError('');

    if(!email){
      setError('Podaj adres email');
      return;
    }

    try{
      const response = await fetch(`${BASE_URL}${ENDPOINTS.resetPassword}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      let data;

      try{
        data = await response.json()
        console.log(data);
      }
      catch{
        data = null;
      }

      if(!response.ok){
        const backendMsg = 'Coś nie powiodło się przy resecie hasła.';
        throw new Error(backendMsg);        
      }

      const challenge_id = data?.challenge_id;
      const purpose = data?.purpose;

      localStorage.setItem('challenge_id', challenge_id);
      localStorage.setItem('purpose', purpose);

      navigate('/zapomnialem-hasla/weryfikacja');
    }
    catch(err){
      setError(err);
    }
  };

  const onKeyDown = (e) => {
    if(e.key === 'Enter') handleResetPassword();
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
            Wprowadź email
          </p>
          <div className='inputs'>
            <input 
              type="email" 
              id="codeForPasswordResetInput" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete='email'
            />
          </div>
          <button className="sign-up-btn" onClick={handleResetPassword}>PRZYWRÓĆ HASŁO</button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword