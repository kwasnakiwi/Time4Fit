import {
  FaPlus as Plus,
  FaSearch as Search,
  FaAngleDown as AngleDown,
} from "react-icons/fa";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import "./../../../styles/clients.css";
import { useSearchParams } from "react-router-dom";
import whiteBin from "./../../../assets/svgs/whiteBin.svg";
import whiteBox from "./../../../assets/svgs/whiteBox.svg";
import { useState } from "react";
import ClientField from "./elements/ClientField";
import { createPortal } from "react-dom";
import DeleteClientModal from "./elements/DeleteClientModal";

function MyClients() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedClients, setSelectedClients] = useState([]);
  const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);

  const page = searchParams.get("page") || "active";
  const search = searchParams.get("search") || "";

  const updateURL = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === null || value === "" || value === undefined) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams, { replace: true });
  };

  const clients = [
    {
      id: 1,
      name: "Adam",
      surname: "Kowalski",
      email: "adam.kowalski@gmail.com",
      phone: "+48 123 456 789",
      goal: "Redukcja wagi",
      lastVisit: "2026-04-15T10:30:00",
      status: "active",
    },
    {
      id: 2,
      name: "Anna",
      surname: "Nowak",
      email: "a.nowak@wp.pl",
      phone: "+48 987 654 321",
      goal: "Budowa masy mięśniowej",
      lastVisit: "2026-05-04T14:00:00",
      status: "inactive",
    },
    {
      id: 3,
      name: "Marek",
      surname: "Zieliński",
      email: "marek.target@outlook.com",
      phone: "+48 555 666 777",
      goal: "Poprawa kondycji",
      lastVisit: "2026-05-01T09:15:00",
      status: "active",
    },
    {
      id: 4,
      name: "Katarzyna",
      surname: "Wójcik",
      email: "kasia.w@gmail.com",
      phone: "+48 111 222 333",
      goal: "Przygotowanie do maratonu",
      lastVisit: "2026-04-28T18:45:00",
      status: "deleted",
    },
  ];

  const toggleAll = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      const allIds = clients.map((client) => client.id);
      setSelectedClients(allIds);
    }
  };

  return (
    <>
      {showDeleteClientModal &&
        createPortal(
          <DeleteClientModal
            setShowModal={setShowDeleteClientModal}
            amount={selectedClients.length}
          />,
          document.body,
        )}
      <NavBar title="Moi podopieczni" route="Moi podopieczni" />
      <SideBar />
      <main className="home-page-container">
        <header className="wk-top-filters">
          <div className="top">
            <div className="wk-top-filters-left">
              <div className="event-type-buttons">
                <button
                  className={`event-type-button ${page === "active" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("page", "active")}
                >
                  Aktywni
                </button>
                <button
                  className={`event-type-button ${page === "inactive" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("page", "inactive")}
                >
                  Nieaktywni
                </button>
                <button
                  className={`event-type-button ${page === "deleted" ? "event-type-button-selected" : ""}`}
                  onClick={() => updateURL("page", "deleted")}
                >
                  Usunięci
                </button>
              </div>
            </div>
            <div className="wk-top-filters-right">
              <button className="add-product-btn">
                <Plus />
                Połącz się z nowym podopiecznym
              </button>
            </div>
          </div>
          <div className="bottom" style={{ position: "relative" }}>
            <div className="filter-wrapper" style={{ maxWidth: "291px" }}>
              <input
                placeholder="Wyszukaj podopiecznego..."
                className="p-filter-input"
                type="text"
                value={searchParams.get("search") || ""}
                onChange={(e) => updateURL("search", e.target.value)}
              />
              <Search className="p-search-icon" />
            </div>
            <div className="filter-wrapper" style={{ maxWidth: "80px" }}>
              <select className="p-filter-input">
                <option value="">Filtr</option>
              </select>
              <AngleDown className="arrow" />
            </div>
            <div
              className={`filter-right-buttons ${selectedClients.length <= 0 ? "disabled" : ""}`}
            >
              <button className="to-inactive">
                <img src={whiteBox} alt="" />
                Przenieś do nieaktywnych
              </button>
              <button
                className="to-deleted"
                onClick={() => setShowDeleteClientModal(true)}
              >
                <img src={whiteBin} alt="" />
                Usuń podopieczn{selectedClients.length > 1 ? "ych" : "ego"}
              </button>
            </div>
          </div>
        </header>
        <section className="clients-wrapper">
          <div className="clients-top">
            <div className="client-top-box">
              <input
                type="checkbox"
                checked={clients.length === selectedClients.length}
                onChange={toggleAll}
              />
            </div>
            <div className="client-top-box">
              <span>Imię i nazwisko</span>
            </div>
            <div className="client-top-box">
              <span>Kontakt</span>
            </div>
            <div className="client-top-box">
              <span>Cel treningowy</span>
            </div>
            <div className="client-top-box">
              <span>Ostatnia wizyta</span>
            </div>
            <div className="client-top-box" />
          </div>
          <div className="clients-content">
            {clients.map((client, i) => (
              <ClientField
                key={client.id}
                name={client.name}
                surname={client.surname}
                email={client.email}
                phone={client.phone}
                goal={client.goal}
                lastVisit={client.lastVisit}
                id={client.id}
                selectedClients={selectedClients}
                setSelectedClients={setSelectedClients}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default MyClients;
