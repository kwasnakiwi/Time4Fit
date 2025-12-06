import './App.css'
import ForgotPassword from './sites/Auth/ForgotPassword.jsx'
import SingUp from './sites/Auth/SingUp.jsx'
import Register from './sites/Auth/Register.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TwoFA from './sites/Auth/2FA.jsx'
import ForgotPasswordVerify from './sites/Auth/ForgotPasswordVerify.jsx'
import ChangePassword from './sites/Auth/ChangePassword.jsx'
import Events from './sites/MainPage/Events/Events.jsx'
import AddEvent1 from './sites/MainPage/Events/AddEvent1.jsx'
import AddEvent2 from './sites/MainPage/Events/AddEvent2.jsx'
import { EventProvider } from './utils/EventContext.jsx'
import EventDetails from './sites/MainPage/Events/EventDetails.jsx'
import EventInvitation from './sites/MainPage/Events/EventInvitation.jsx'
import EventsMap from './sites/MainPage/Events/EventsMap.jsx'
import HomePage from './sites/MainPage/Home/HomePage.jsx'
import PublicProfile from './sites/MainPage/Profile/PublicProfile.jsx'
import ToTimeForBiz from './sites/MainPage/Loadings/ToTimeForBiz.jsx'
import ToTimeForFit from './sites/MainPage/Loadings/ToTimeForFit.jsx'
import EditProfile from './sites/MainPage/Profile/EditProfile.jsx'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<SingUp />} />
          <Route path='/rejestracja' element={<Register />} />
          <Route path='/zapomnialem-hasla' element={<ForgotPassword />} />
          <Route path='/logowanie' element={<TwoFA />} />
          <Route path='/zapomnialem-hasla/weryfikacja' element={<ForgotPasswordVerify />} />
          <Route path='/zapomnialem-hasla/zmiana-hasla' element={<ChangePassword />} />
          <Route path='/eventy' element={<Events />} />
          <Route path='/eventy/mapa-eventow' element={<EventsMap />} />
          <Route path="/eventy/:id" element={<EventDetails />} />
          <Route
            path="/eventy/dodawanie-eventu/*"
            element={
              <EventProvider>
                <Routes>
                  <Route path="" element={<AddEvent1 />} />
                  <Route path="2" element={<AddEvent2 />} />
                </Routes>
              </EventProvider>
            }
          />
          <Route path='/eventy/zaproszenie' element={<EventInvitation />} />
          <Route path='/strona-glowna' element={<HomePage />} />
          <Route path='/profil' element={<PublicProfile />} />
          <Route path='/profil/edycja' element={<EditProfile />} />
          <Route path='/test' element={<ToTimeForBiz />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
