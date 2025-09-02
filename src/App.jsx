import './App.css'
import ForgotPassword from './sites/ForgotPassword.jsx'
import SingUp from './sites/SingUp.jsx'
import Register from './sites/Register.jsx'
// import Tests from './sites/Tests.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<SingUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
