import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import "./../../../styles/trainerlist.css";
import { FaSearch as Search, FaAngleDown as AngleDown } from "react-icons/fa";
import sort from "./../../../assets/images/sort.png";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../utils/Endopoints";
import TrainerField from "./elements/TrainerField";

function TrainerList() {
  const [trainers, setTrainers] = useState([]);

  const getTrainerList = async () => {
    try {
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.trainersList}`);

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error);
      }

      setTrainers(data);
      console.log("trainers:", data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTrainerList();
  }, []);

  return (
    <>
      <NavBar title="Trenerzy" route="Trenerzy" />
      <SideBar />
      <main className="home-page-container">
        <div className="trainer-list-filters">
          <div className="trainer-search-wrapper">
            <input
              type="text"
              className="trainer-search"
              placeholder="Wyszukaj trenera..."
            />
            <Search className="search" />
          </div>
          <div className="trainer-search-wrapper">
            <select className="trainer-cat-select">
              <option value="">Kategoria</option>
            </select>
            <AngleDown className="angle-down" />
          </div>
          <div className="trainer-search-wrapper">
            <select
              className="trainer-cat-select"
              style={{ padding: "6px 29px 6px 40px" }}
            >
              <option value="">Sortuj:</option>
            </select>
            <img className="sort-icon" src={sort} alt="" />
            <AngleDown className="angle-down" />
          </div>
        </div>
        <div className="trainers">
          {trainers.map((trainer, i) => (
            <TrainerField
              key={i}
              pfpImage={trainer.img_profile}
              name={trainer.profile.name}
              surname={trainer.profile.surname}
              specialization={trainer.pick_specialization || "-"}
              eventPast={trainer.num_photos}
              rating={trainer.avg_rate || "-"}
              followers={trainer.followers_count}
              phoneNumber={trainer.phone_business || "-"}
              email={trainer.business_email || "-"}
              trainerId={trainer.id}
              getTrainerList={getTrainerList}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default TrainerList;
