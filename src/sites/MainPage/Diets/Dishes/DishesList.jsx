import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import "./../../../../styles/diets.css";

function DishesList() {
  return (
    <>
      <NavBar title="Lista dań" route="Lista dań" />
      <SideBar />
      <main className="home-page-container"></main>
    </>
  );
}

export default DishesList;
