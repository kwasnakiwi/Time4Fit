import logo from './../assets/images/appLogo.png';
import './../styles/SignUp.css';

function ForgotPassword(){


  return(
    <>
      <div className="main-container">
        <div className="panel">
          <div className="panel-top">
            <img src={logo} alt="App Logo" />
            <button className="change-sign-up">Logowanie</button>
          </div>
          <h1 className='title'>Zapomniałem hasła</h1>
          <p className='description'>
            Wprowadź kod otrzymany na email.
          </p>
          <div className='inputs'>
            <input type="text" id="codeForPasswordResetInput" />
          </div>
          <div className="forgot-password-box">
            <a href="#" className='forgot-password'>Wyślij ponownie</a>
          </div>
          <button className="sign-up-btn">PRZYWRÓĆ HASŁO</button>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword