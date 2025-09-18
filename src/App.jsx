import './App.css'
import ForgotPassword from './sites/Auth/ForgotPassword.jsx'
import SingUp from './sites/Auth/SingUp.jsx'
import Register from './sites/Auth/Register.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TwoFA from './sites/Auth/2FA.jsx'
import HomePage from './sites/MainPage/HomePage.jsx'
import ForgotPasswordVerify from './sites/Auth/ForgotPasswordVerify.jsx'
import ChangePassword from './sites/Auth/ChangePassword.jsx'
import NavBar from './sites/MainPage/components/NavBar.jsx'

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
          <Route path='/events' element={<NavBar />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
