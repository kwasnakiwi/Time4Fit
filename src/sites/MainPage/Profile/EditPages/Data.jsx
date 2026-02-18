import "./../../../../styles/profile.css";
import editIcon from "./../../../../assets/images/edit-icon.png";
import circlePfp from "./../../../../assets/images/circle-pfp.png";
import editIcon2 from "./../../../../assets/images/edit-icon2.png";

function Data({ me, refetchMe, userData }) {
  return (
    <>
      <div className="profile-user-data">
        <section className="user-data-panel ud-pfp">
          <div className="user-data-pfp-wrapper">
            <img src={circlePfp} alt="Zdjęcie profilowe" />
            <div className="change-pfp-icon">
              <img src={editIcon2} />
            </div>
          </div>
          <div className="ud-user-name-box">
            <h2 className="ud-user-name">
              {userData.name} {userData.surname}
            </h2>
            <span className="ud-user-status">
              {!me?.subscription ? "Użytkownik" : me.subscription.plan_name}
            </span>
          </div>
        </section>
        <section className="user-data-panel ud-with-content">
          <div className="ud-container">
            <h3 className="ud-container-title">Dane podstawowe</h3>
            <div className="user-data-content">
              <div className="ud-info-box">
                <span className="ud-info-title">Imię</span>
                <br />
                <span className="ud-info-value">{userData.name}</span>
              </div>
              <div className="ud-info-box">
                <span className="ud-info-title">Nazwisko</span>
                <br />
                <span className="ud-info-value">{userData.surname}</span>
              </div>
              <div className="ud-info-box">
                <span className="ud-info-title">Płeć</span>
                <br />
                <span className="ud-info-value">
                  {userData.sex !== "none" ? userData.sex : "Nie podano"}
                </span>
              </div>
              <div className="ud-info-box">
                <span className="ud-info-title">Data urodzenia</span>
                <br />
                <span className="ud-info-value">
                  {userData.birth_day || "Nie podano"}
                </span>
              </div>
            </div>
            <button className="edit-pr-action-btn">
              Edytuj
              <img src={editIcon} />
            </button>
          </div>
        </section>
        <section className="user-data-panel ud-with-content">
          <div className="ud-container">
            <h3 className="ud-container-title">Dane kontaktowe</h3>
            <div className="user-data-content">
              <div className="ud-info-box">
                <span className="ud-info-title">E-mail</span>
                <br />
                <span className="ud-info-value">{me?.email}</span>
              </div>
              <div className="ud-info-box">
                <span className="ud-info-title">Nr. telefonu</span>
                <br />
                <span className="ud-info-value">
                  {userData.phone_number || "Nie podano"}
                </span>
              </div>
            </div>
            <button className="edit-pr-action-btn">
              Edytuj
              <img src={editIcon} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Data;
