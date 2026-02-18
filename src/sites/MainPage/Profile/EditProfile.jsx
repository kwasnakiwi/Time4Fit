import { useContext, useEffect, useRef, useState } from "react";

import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import "./../../../styles/profile.css";
import "./../../../styles/components.css";

import prSide1 from "./../../../assets/images/pr-side1.png";
import prSide2 from "./../../../assets/images/pr-side2.png";
import prSide3 from "./../../../assets/images/pr-side3.png";
import prSide4 from "./../../../assets/images/pr-side4.png";
import prSide5 from "./../../../assets/images/pr-side5.png";
import prSide6 from "./../../../assets/images/pr-side6.png";
import prSide7 from "./../../../assets/images/pr-side7.png";
import clPrSide1 from "./../../../assets/images/cl-pr-side1.png";
import clPrSide2 from "./../../../assets/images/cl-pr-side2.png";
import clPrSide3 from "./../../../assets/images/cl-pr-side3.png";
import clPrSide4 from "./../../../assets/images/cl-pr-side4.png";
import clPrSide5 from "./../../../assets/images/cl-pr-side5.png";
import clPrSide6 from "./../../../assets/images/cl-pr-side6.png";
import clPrSide7 from "./../../../assets/images/cl-pr-side7.png";

import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints.jsx";

import { UserContext } from "../../../utils/UserContext.jsx";
import Trainer from "./EditPages/Trainer.jsx";
import Data from "./EditPages/Data.jsx";
import Place from "./EditPages/Place.jsx";

function EditProfile() {
  const { me, refetchMe } = useContext(UserContext);

  const [userData, setUserData] = useState({});
  const [selected, setSelected] = useState("data");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiFetch(`${BASE_URL}${ENDPOINTS.settings}`);

        let data;
        try {
          data = await response.json();
        } catch {
          data = null;
        }

        if (!response.ok) {
          throw new Error(data?.error);
        }

        setUserData(data || {});
        console.log("settings:", data);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <NavBar
        title="Ustawienia konta"
        route="Ustawienia konta"
        linkRoute="/strona-glowna"
      />
      <SideBar />
      <main className="home-page-container profile-edit-container">
        <div className="profile-edit-side">
          <nav className="profile-side-container">
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title">Użytkownik</h2>
              </div>
              <ul className="pr-side-part-list">
                <li
                  className={selected == "data" ? "pr-side-selected" : ""}
                  onClick={() => setSelected("data")}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <img src={selected == "data" ? clPrSide2 : prSide2} />
                  </div>
                  Dane użytkownika
                </li>
                <li
                  className={selected == "safety" ? "pr-side-selected" : ""}
                  onClick={() => setSelected("safety")}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <img src={selected == "safety" ? clPrSide3 : prSide3} />
                  </div>
                  Bezpieczeństwo
                </li>
                <li
                  className={
                    selected == "notifications" ? "pr-side-selected" : ""
                  }
                  onClick={() => setSelected("notifications")}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <img
                      src={selected == "notifications" ? clPrSide4 : prSide4}
                    />
                  </div>
                  Powiadomienia
                </li>
                <li
                  className={selected == "payments" ? "pr-side-selected" : ""}
                  onClick={() => setSelected("payments")}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <img src={selected == "payments" ? clPrSide5 : prSide5} />
                  </div>
                  Płatności
                </li>
              </ul>
            </section>
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title">Tworzenie</h2>
              </div>
              <ul className="pr-side-part-list">
                <li
                  className={selected == "place" ? "pr-side-selected" : ""}
                  onClick={() => setSelected("place")}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <img src={selected == "place" ? clPrSide6 : prSide6} />
                  </div>
                  Placówka
                </li>
                <li
                  className={selected == "event" ? "pr-side-selected" : ""}
                  onClick={() => setSelected("event")}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <img src={selected == "event" ? clPrSide7 : prSide7} />
                  </div>
                  Eventy
                </li>
              </ul>
            </section>
            <section className="pr-side-part">
              <div className="pr-side-part-title-box">
                <h2 className="pr-side-part-title biz">Funkcje biznes</h2>
              </div>
              <ul className="pr-side-part-list">
                <li
                  className={selected == "profile" ? "pr-side-selected" : ""}
                  onClick={() => {
                    !userData.is_trainer
                      ? navigate("/profil/edycja/stworz-profil-trenera")
                      : setSelected("profile");
                  }}
                >
                  <div style={{ width: "20px", height: "20px" }}>
                    <img src={selected == "profile" ? clPrSide1 : prSide1} />
                  </div>
                  {userData.is_trainer ? "Mój trener" : "Jestem trenerem"}
                </li>
                <li onClick={() => setSelected("place")}>
                  <div style={{ width: "20px", height: "20px" }}>
                    <img src={selected == "event" ? clPrSide7 : prSide7} />
                  </div>
                  Jestem placówką
                </li>
              </ul>
            </section>
          </nav>
        </div>
        {selected == "profile" && <Trainer trainerId={userData?.trainer_id} />}
        {selected == "data" && (
          <Data me={me} refetchMe={refetchMe} userData={userData} />
        )}
        {selected == "place" && <Place />}
      </main>
    </>
  );
}

export default EditProfile;
