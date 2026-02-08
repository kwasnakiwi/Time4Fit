import { useEffect, useState } from "react";
import "./../../../../styles/popup.css";
import sett from "./../../../../assets/images/sett.png";
import { apiFetch } from "../../../../interceptor/interceptor";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints";

function EditProfileModal({
  setShowModal,
  heading,
  title,
  type,
  value,
  setValue,
  maxLength,
  trainerId,
  field,
  getProfileInfo,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEdit = async () => {
    const formData = new FormData();

    formData.append(field, value);

    try {
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.trainerProfiles}${trainerId}/`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      let data = null;
      try {
        data = response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error);
      }

      await getProfileInfo();

      setShowModal(false);
      setValue(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowModal(false)}
      />
      <div className="template-modal">
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={sett} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Edycja profilu</h3>
              <span>{heading}</span>
            </div>
          </div>
          <span className="close-modal" onClick={() => setShowModal(false)}>
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <div className="template-modal-input-box">
            <label htmlFor="edit-input" className="template-modal-title">
              {title}
            </label>
            {type === "textarea" ? (
              <textarea
                name="edit-input"
                className="template-modal-input textarea"
                maxLength={maxLength}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            ) : (
              <input
                type="text"
                name="edit-input"
                className="template-modal-input"
                maxLength={maxLength}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}
            <span className="length-counter">{value?.length || 0}/{maxLength}</span>
          </div>
        </section>
        <hr className="template-modal-line" />
        <section className="template-modal-btns">
          <button
            className="template-modal-btn cancel"
            onClick={() => setShowModal(false)}
          >
            Anuluj
          </button>
          <button className="template-modal-btn accept" onClick={handleEdit}>
            Edytuj
          </button>
        </section>
      </div>
    </>
  );
}

export default EditProfileModal;
