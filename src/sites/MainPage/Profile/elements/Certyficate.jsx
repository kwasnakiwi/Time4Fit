import "./../../../../styles/profile.css";
import { useState, useEffect } from "react";
import { apiFetch } from "../../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints";
import editIcon from "./../../../../assets/images/edit-icon.png";
import addIcon from "./../../../../assets/images/add-icon.png";
import { createPortal } from "react-dom";
import AddCertyficateModal from "./AddCertyficateModal";

function Certyficate({
  cId,
  title,
  issuedBy,
  issuedDate,
  identyficatior,
  images,
  setCerTitle,
  setIssuedBy,
  setCerIdentificator,
  setIssuedDay,
  setIssuedMonth,
  setIssuedYear,
  setCerImages,
  setCerEdit,
  setCerEditId,
  setShowCerPopup,
  profileData,
  getProfileInfo,
}) {
  const handleRemoveCertyficate = async (cerId) => {
    try {
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.trainerCertyficates}${cerId}/`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Nie udało się usunąć certyfikatu");
      }

      await getProfileInfo();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickEditCertyficate = (
    cerId,
    title,
    issuedBy,
    identyficator,
    day,
    month,
    year,
    images,
  ) => {
    setCerTitle(title);
    setIssuedBy(issuedBy);
    setCerIdentificator(identyficator);
    setIssuedDay(day);
    setIssuedMonth(month);
    setIssuedYear(year);
    setCerImages(
      Array.isArray(images)
        ? images.map((img) => ({
            file: null,
            preview: img.image,
          }))
        : [],
    );

    setCerEdit(true);
    setShowCerPopup(true);
    setCerEditId(cerId);
  };

  const formatDate1 = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      month: "short",
      year: "numeric",
    });
  };

  const formatDate2 = (date) => {
    const d = new Date(date);

    return {
      day: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    };
  };

  const formatDate3 = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <>
      <div className="certificate">
        <h3 className="cer-title">Certyfikat z ukończenia szkolenia:</h3>
        <h4 className="cer-name">{title}</h4>
        <span className="cer-place-info">{issuedBy}</span>
        <br />
        <span className="cer-more-info">Issued {formatDate1(issuedDate)}</span>
        <br />
        <span className="cer-more-info">
          Identyfikator poświadczenia: {identyficatior}
        </span>
        <br />
        <div className="cer-imgs">
          {images?.map((img, idx) => (
            <img
              key={idx}
              src={img.image}
              className="cer-img"
              alt="Certyfikat"
            />
          ))}
        </div>
        {profileData?.certyficates?.length !== 1 && (
          <hr
            style={{
              border: "1px solid #74747450",
              marginRight: "10px",
            }}
          />
        )}
        <div className="cer-btns">
          <button
            style={{ position: "static" }}
            onClick={() =>
              handleClickEditCertyficate(
                cId,
                title,
                issuedBy,
                identyficatior,
                formatDate2(issuedDate).day,
                formatDate2(issuedDate).month,
                formatDate2(issuedDate).year,
                images,
              )
            }
            className="edit-pr-action-btn"
          >
            Edytuj
            <img src={editIcon} />
          </button>
          <button
            style={{ position: "static" }}
            onClick={() => handleRemoveCertyficate(cId)}
            className="edit-pr-action-btn"
          >
            Usuń
            <img src={addIcon} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Certyficate;
