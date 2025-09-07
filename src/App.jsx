import './App.css'
import ForgotPassword from './sites/ForgotPassword.jsx'
import SingUp from './sites/SingUp.jsx'
import Register from './sites/Register.jsx'
// import Tests from './sites/Tests.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TwoFA from './sites/2FA.jsx'
import HomePage from './sites/HomePage.jsx'
import ForgotPasswordVerify from './sites/ForgotPasswordVerify.jsx'
import ChangePassword from './sites/ChangePassword.jsx'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SingUp />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/login' element={<TwoFA />} />
          <Route path='/home-page' element={<HomePage />} />
          <Route path='/forgot-password/verify' element={<ForgotPasswordVerify />} />
          <Route path='/forgot-password/change-password' element={<ChangePassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
