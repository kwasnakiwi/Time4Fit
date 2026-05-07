import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Contexts
import { UserProvider } from "./utils/UserContext.jsx";
import { EventProvider } from "./utils/EventContext.jsx";

// Importy komponentów
import ForgotPassword from "./sites/Auth/ForgotPassword.jsx";
import SingUp from "./sites/Auth/SingUp.jsx";
import Events from "./sites/MainPage/Events/Events.jsx";
import AddEvent1 from "./sites/MainPage/Events/AddEvent1.jsx";
import AddEvent2 from "./sites/MainPage/Events/AddEvent2.jsx";
import EventDetails from "./sites/MainPage/Events/EventDetails.jsx";
import EventInvitation from "./sites/MainPage/Events/EventInvitation.jsx";
import EventsMap from "./sites/MainPage/Events/EventsMap.jsx";
import HomePage from "./sites/MainPage/Home/HomePage.jsx";
import PublicProfile from "./sites/MainPage/Profile/PublicProfile.jsx";
import EditProfile from "./sites/MainPage/Profile/EditProfile.jsx";
import CreateTrainerProfile from "./sites/MainPage/Profile/CreateTrainerProfile.jsx";
import TrainerList from "./sites/MainPage/TrainerList/TrainerList.jsx";
import MyClients from "./sites/MainPage/Clients/MyClients.jsx";
import ChoosePlace from "./sites/MainPage/Places/ChoosePlace.jsx";
import AddPlace from "./sites/MainPage/Places/AddPlace.jsx";
import PlacesMenu from "./sites/T4B/PlacesMenu.jsx";
import DishDetails from "./sites/MainPage/Diets/Dishes/DIshDetails.jsx";
import Diets from "./sites/MainPage/Diets/Diets.jsx";
import Workouts from "./sites/MainPage/Workouts/Workouts.jsx";
import AddTrainingPlan from "./sites/MainPage/Workouts/TrainingPlan/AddTrainingPlan.jsx";
import TrainingPlans from "./sites/MainPage/Workouts/TrainingPlan/TrainingPlans.jsx";
import Calendar from "./sites/MainPage/Calendar/Calendar.jsx";
import AddSurvey from "./sites/MainPage/Surveys/AddSurvey.jsx";
import ToTimeForFit from "./sites/MainPage/Loadings/ToTimeForFit.jsx";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          
          {/* --- SEKCJA AUTH --- */}
          <Route path="/">
            <Route index element={<SingUp />} />
            <Route path="rejestracja" element={<SingUp />} />
            <Route path="logowanie" element={<SingUp is2FA />} />
            <Route path="zapomnialem-hasla">
              <Route index element={<ForgotPassword />} />
              <Route path="weryfikacja" element={<ForgotPassword isVerify />} />
              <Route path="zmiana-hasla" element={<ForgotPassword isReset />} />
            </Route>
          </Route>

          {/* --- SEKCJA HOME & TOOLS --- */}
          <Route path="/strona-glowna">
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/kalendarz">
            <Route index element={<Calendar />} />
          </Route>
          <Route path="/test">
            <Route index element={<ToTimeForFit />} />
          </Route>

          {/* --- SEKCJA EVENTY --- */}
          <Route path="/eventy">
            <Route index element={<Events />} />
            <Route path="mapa-eventow" element={<EventsMap />} />
            <Route path=":id" element={<EventDetails />} />
            <Route path="zaproszenie">
              <Route index element={<EventInvitation />} />
              <Route path="event/:access_code" element={<EventDetails />} />
            </Route>
            <Route
              path="dodawanie-eventu"
              element={
                <EventProvider>
                  <Outlet />
                </EventProvider>
              }
            >
              <Route index element={<AddEvent1 />} />
              <Route path="2" element={<AddEvent2 />} />
            </Route>
          </Route>

          {/* --- SEKCJA PROFIL --- */}
          <Route path="/profil">
            <Route path="edycja">
              <Route index element={<EditProfile />} />
              <Route
                path="stworz-profil-trenera"
                element={<CreateTrainerProfile />}
              />
            </Route>
          </Route>

          {/* --- SEKCJA TRENERZY I KLIENCI --- */}
          <Route path="/lista-trenerow">
            <Route index element={<TrainerList />} />
            <Route path=":trainerId" element={<PublicProfile />} />
          </Route>

          <Route path="/moi-podopieczni">
            <Route index element={<MyClients />} />
          </Route>

          {/* --- SEKCJA PLACÓWKI --- */}
          <Route path="/placowki">
            <Route path="wybor-planu" element={<ChoosePlace />} />
            <Route path="dodawanie-placowki" element={<AddPlace />} />
          </Route>

          <Route path="/time-4-biz">
            <Route path="menu-placowek" element={<PlacesMenu />} />
          </Route>

          {/* --- SEKCJA FITNESS & DIETA --- */}
          <Route path="/diety">
            <Route index element={<Diets />} />
            <Route path="potrawa/:id" element={<DishDetails />} />
          </Route>

          <Route path="/plany-treningowe">
            <Route index element={<TrainingPlans />} />
            <Route path="dodaj-plan-treningowy">
              <Route index element={<AddTrainingPlan />} />
              <Route path="dodaj-cwiczenie" element={<Workouts />} />
            </Route>
          </Route>

          {/* --- SEKCJA ANKIETY --- */}
          <Route path="/ankiety">
            <Route path="dodaj-ankiete" element={<AddSurvey />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
