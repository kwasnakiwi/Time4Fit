import "./App.css";
import ForgotPassword from "./sites/Auth/ForgotPassword.jsx";
import SingUp from "./sites/Auth/SingUp.jsx";
import Register from "./sites/Auth/Register.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TwoFA from "./sites/Auth/2FA.jsx";
import ForgotPasswordVerify from "./sites/Auth/ForgotPasswordVerify.jsx";
import ChangePassword from "./sites/Auth/ChangePassword.jsx";
import Events from "./sites/MainPage/Events/Events.jsx";
import AddEvent1 from "./sites/MainPage/Events/AddEvent1.jsx";
import AddEvent2 from "./sites/MainPage/Events/AddEvent2.jsx";
import { EventProvider } from "./utils/EventContext.jsx";
import EventDetails from "./sites/MainPage/Events/EventDetails.jsx";
import EventInvitation from "./sites/MainPage/Events/EventInvitation.jsx";
import EventsMap from "./sites/MainPage/Events/EventsMap.jsx";
import HomePage from "./sites/MainPage/Home/HomePage.jsx";
import PublicProfile from "./sites/MainPage/Profile/PublicProfile.jsx";
import ToTimeForBiz from "./sites/MainPage/Loadings/ToTimeForBiz.jsx";
import ToTimeForFit from "./sites/MainPage/Loadings/ToTimeForFit.jsx";
import EditProfile from "./sites/MainPage/Profile/EditProfile.jsx";
import Calendar from "./sites/MainPage/Calendar/Calendar.jsx";
import ChoosePlace from "./sites/MainPage/Places/ChoosePlace.jsx";
import AddPlace from "./sites/MainPage/Places/AddPlace.jsx";
import PlacesMenu from "./sites/T4B/PlacesMenu.jsx";
import CreateTrainerProfile from "./sites/MainPage/Profile/CreateTrainerProfile.jsx";
import TrainerList from "./sites/MainPage/TrainerList/TrainerList.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SingUp />} />
          <Route path="/rejestracja" element={<Register />} />
          <Route path="/zapomnialem-hasla" element={<ForgotPassword />} />
          <Route path="/logowanie" element={<TwoFA />} />
          <Route
            path="/zapomnialem-hasla/weryfikacja"
            element={<ForgotPasswordVerify />}
          />
          <Route
            path="/zapomnialem-hasla/zmiana-hasla"
            element={<ChangePassword />}
          />
          <Route path="/eventy" element={<Events />} />
          <Route path="/eventy/mapa-eventow" element={<EventsMap />} />
          <Route path="/eventy/:id" element={<EventDetails />} />
          <Route
            path="/eventy/zaproszenie/event/:access_code"
            element={<EventDetails />}
          />
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
          <Route path="/eventy/zaproszenie" element={<EventInvitation />} />
          <Route path="/strona-glowna" element={<HomePage />} />
          <Route path="/profil/edycja" element={<EditProfile />} />
          <Route
            path="/profil/edycja/stworz-profil-trenera"
            element={<CreateTrainerProfile />}
          />
          <Route path="/test" element={<ToTimeForFit />} />
          <Route path="/kalendarz" element={<Calendar />} />
          <Route
            path="/placowki/*"
            element={
              <Routes>
                <Route path="wybor-planu" element={<ChoosePlace />} />
                <Route path="dodawanie-placowki" element={<AddPlace />} />
              </Routes>
            }
          />
          <Route
            path="time-4-biz/*"
            element={
              <Routes>
                <Route path="menu-placowek" element={<PlacesMenu />} />
              </Routes>
            }
          />
          <Route
            path="/lista-trenerow/*"
            element={
              <Routes>
                <Route path="" element={<TrainerList />} />
                <Route path=":trainerId" element={<PublicProfile />} />
              </Routes>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
