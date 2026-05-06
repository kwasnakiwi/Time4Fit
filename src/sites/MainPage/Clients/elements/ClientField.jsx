import "./../../../../styles/clients.css";
import greyMail from "./../../../../assets/svgs/grey-mail.svg";
import greyPhone from "./../../../../assets/svgs/grey-phone.svg";
import orangeArrow from "./../../../../assets/svgs/orange-arrow.svg";
import { FaArrowRight as ArrowRight } from "react-icons/fa";

function ClientField({
  id,
  selectedClients,
  setSelectedClients,
  name,
  surname,
  email,
  phone,
  goal,
  lastVisit,
}) {
  const formatDate = (date) => {
    const d = new Date(date);
    const days = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${days.toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${year}`;
  };

  const getDaysAway = (date = new Date()) => {
    const lastVisitTime = new Date(lastVisit).getTime();
    const currentTime = new Date(date).getTime();

    const diffInMs = currentTime - lastVisitTime;
    const daysAway = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return daysAway;
  };

  const daysAwaysLabel =
    getDaysAway() <= 1 ? "Wczoraj" : getDaysAway() + " dni temu";

  const isChecked = selectedClients.includes(id);

  const handleToggleClient = () => {
    if (isChecked) {
      setSelectedClients((prev) => prev.filter((clientId) => clientId !== id));
    } else {
      setSelectedClients((prev) => [...prev, id]);
    }
  };

  return (
    <>
      <div className="client-field">
        <div className="client-field-box">
          <input 
            type="checkbox" 
            checked={isChecked} 
            onChange={() => handleToggleClient()} 
          />
        </div>
        <div className="client-field-box">
          <span className="cf-name">
            {name} {surname}
          </span>
        </div>
        <div className="client-field-box">
          <div className="cf-flex-wrapper">
            <span className="cf-email">
              <img src={greyMail} alt="" />
              {email}
            </span>
            <span className="cf-phone">
              <img src={greyPhone} alt="" />
              {phone}
            </span>
          </div>
        </div>
        <div className="client-field-box">
          <span className="cf-goal">{goal}</span>
        </div>
        <div className="client-field-box">
          <div className="cf-flex-wrapper" style={{ rowGap: "0" }}>
            <span className="cf-last-visit">{formatDate(lastVisit)}</span>
            <span
              className={`cf-days-away ${getDaysAway() <= 3 ? "green" : getDaysAway() <= 10 ? "black" : ""}`}
            >
              {daysAwaysLabel}
            </span>
          </div>
        </div>
        <div className="client-field-box">
          <img src={orangeArrow} alt="" />
        </div>
      </div>
    </>
  );
}

export default ClientField;
