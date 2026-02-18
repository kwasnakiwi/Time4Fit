import "./../../../../styles/profile.css";
import { useEffect, useRef } from "react";
import { apiFetch } from "./../../../../interceptor/interceptor.jsx";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints.jsx";

import { BiX as XMark } from "react-icons/bi";
import popup1 from "./../../../../assets/images/popup1.png";

import cer1 from "./../../../../assets/images/cer1.png";
import cer2 from "./../../../../assets/images/cer2.png";
import cer3 from "./../../../../assets/images/cer3.png";
import cer4 from "./../../../../assets/images/cer4.png";
import cer5 from "./../../../../assets/images/cer5.png";
import cer6 from "./../../../../assets/images/cer6.png";
import cer7 from "./../../../../assets/images/cer7.png";

function AddCertyficateModal({
  getProfileInfo,
  setShowPopup,
  cerEdit,
  setCerEdit,
  setCerEditId,
  cerEditId,
  setCerTitle,
  setIssuedBy,
  setCerIdentificator,
  setIssuedDay,
  setIssuedMonth,
  setIssuedYear,
  setCerImages,
  cerTitle,
  issuedBy,
  cerIdentificator,
  issuedDay,
  issuedMonth,
  issuedYear,
  cerImages,
}) {
  const cerInputRef = useRef(null);

  useEffect(() => {
    if (!issuedYear || !issuedMonth || !issuedDay) return;

    const maxDays = getDaysInMonth(issuedYear, issuedMonth);
    if (issuedDay > maxDays) {
      setIssuedDay(maxDays);
    }
  }, [issuedMonth, issuedYear]);

  const getDaysInMonth = (year, month) => {
    if (!year || !month) return 31;
    return new Date(year, month, 0).getDate();
  };

  const handleCerImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setCerImages((prev) => {
      const newItems = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...prev, ...newItems].slice(0, 4);
    });
    e.target.value = null;
  };

  const handleCerImageDelete = (index) => {
    setCerImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddCertyficate = async () => {
    if (
      !cerTitle ||
      !issuedBy ||
      !issuedDay ||
      !issuedMonth ||
      !issuedYear ||
      !cerImages
    ) {
      return;
    }
    const issuedDate = `${issuedYear}-${String(issuedMonth).padStart(2, "0")}-${String(issuedDay).padStart(2, "0")}`;
    const formData = new FormData();

    formData.append("title", cerTitle);
    formData.append("issued_by", issuedBy);
    formData.append("identyficatior", cerIdentificator);
    formData.append("issued_date", issuedDate);
    cerImages.forEach((img, i) => {
      formData.append("uploaded_images", img.file);
    });

    console.log(issuedDate);
    try {
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.trainerCertyficates}`,
        {
          method: "POST",
          body: formData,
        },
      );

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.error);
      }

      setCerTitle("");
      setIssuedBy("");
      setCerIdentificator("");
      setIssuedDay(null);
      setIssuedMonth(null);
      setIssuedYear(null);
      setCerImages([]);

      setCerEdit(false);
      setCerEditId(null);

      await getProfileInfo();

      setShowPopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditCertyficate = async () => {
    if (
      !cerTitle ||
      !issuedBy ||
      !issuedDay ||
      !issuedMonth ||
      !issuedYear ||
      !cerImages
    ) {
      return;
    }

    const formData = new FormData();
    const issuedDate = `${issuedYear}-${String(issuedMonth).padStart(2, "0")}-${String(issuedDay).padStart(2, "0")}`;

    formData.append("title", cerTitle);
    formData.append("issued_by", issuedBy);
    formData.append("identyficatior", cerIdentificator);
    formData.append("issued_date", issuedDate);
    cerImages.forEach((img, i) => {
      formData.append("uploaded_images", img.file);
    });

    try {
      const response = await apiFetch(
        `${BASE_URL}${ENDPOINTS.trainerCertyficates}${cerEditId}/`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data.error);
      }

      setCerTitle("");
      setIssuedBy("");
      setCerIdentificator("");
      setIssuedDay(null);
      setIssuedMonth(null);
      setIssuedYear(null);
      setCerImages([]);

      await getProfileInfo();

      setShowPopup(false);
      setCerEditId(null);
      setCerEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 1112 }}
        className="code-popup-overlay"
        onClick={(e) => {
          setShowPopup(false);
          setCerEdit(false);
          setCerEdit(null);
        }}
      />
      <div
        style={{ width: "100%", maxWidth: "660px", zIndex: 1113 }}
        className="code-popup"
      >
        <div className="code-popup-heading evd">
          <div className="popup1-box">
            <img src={popup1} alt="" />
          </div>
          <div>
            <h3>Dyplomy i certyfikaty</h3>
            <p>Dodaj nowe osiągnięcie</p>
            <XMark
              className="code-x"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setShowPopup(false);
                setCerEdit(false);
                setCerEdit(null);
              }}
            />
          </div>
        </div>
        <div className="code-content">
          <h4 className="popup-setting">
            <img src={cer1} alt="" />
            Dane
          </h4>
          <div className="popup-input-box">
            <label className="popup-input-title" htmlFor="cer-title">
              <img src={cer2} alt="" />
              Wprowadź tytuł
            </label>
            <input
              type="text"
              value={cerTitle}
              onChange={(e) => setCerTitle(e.target.value)}
              className="popup-input"
              name="cer-title"
            />
          </div>
          <div className="popup-input-box">
            <label className="popup-input-title" htmlFor="cer-title">
              <img src={cer3} alt="" />
              Wystawione przez
            </label>
            <input
              type="text"
              value={issuedBy}
              onChange={(e) => setIssuedBy(e.target.value)}
              className="popup-input"
              name="cer-title"
            />
          </div>
          <div className="popup-input-box">
            <label className="popup-input-title" htmlFor="cer-title">
              <img src={cer4} alt="" />
              Identyfikator poświadczenia
            </label>
            <input
              type="text"
              value={cerIdentificator}
              onChange={(e) => setCerIdentificator(e.target.value)}
              className="popup-input"
              name="cer-title"
            />
          </div>
          <h4 className="popup-setting">
            <img src={cer5} alt="" />
            Data wystawienia
          </h4>
          <div className="popup-date-inputs">
            <div className="popup-input-box">
              <label>Dzień</label>
              <select
                className="popup-input"
                value={issuedDay || ""}
                disabled={!issuedMonth || !issuedYear}
                onChange={(e) => setIssuedDay(Number(e.target.value))}
              >
                <option value="">--</option>
                {Array.from(
                  { length: getDaysInMonth(issuedYear, issuedMonth) },
                  (_, i) => i + 1,
                ).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-input-box">
              <label>Miesiąc</label>
              <select
                className="popup-input"
                value={issuedMonth || ""}
                onChange={(e) => setIssuedMonth(Number(e.target.value))}
              >
                <option value="">--</option>
                {[
                  "Styczeń",
                  "Luty",
                  "Marzec",
                  "Kwiecień",
                  "Maj",
                  "Czerwiec",
                  "Lipiec",
                  "Sierpień",
                  "Wrzesień",
                  "Październik",
                  "Listopad",
                  "Grudzień",
                ].map((name, i) => (
                  <option key={i + 1} value={i + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-input-box">
              <label>Rok</label>
              <select
                className="popup-input"
                value={issuedYear || ""}
                onChange={(e) => setIssuedYear(Number(e.target.value))}
              >
                <option value="">--</option>
                {Array.from({ length: 70 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <h4 className="popup-setting">
            <img src={cer6} alt="" />
            Zdjęcia
            <span
              onClick={() => cerInputRef.current.click()}
              className={`add-cer-imgs ${cerImages?.length >= 4 ? "disabled" : ""}`}
            >
              <img src={cer7} alt="" />
              Dodaj zdjęcie +
            </span>
          </h4>
          <input
            type="file"
            ref={cerInputRef}
            multiple
            accept="image/*"
            hidden
            onChange={handleCerImagesChange}
          />
          <div className="cer-images">
            {cerImages?.map((img, i) => (
              <div className="cer-image-box" key={i}>
                <div className="cer-image-wrapper">
                  <img
                    className="cer-image"
                    src={img.preview}
                    alt={`cert-${i}`}
                  />
                  <div
                    className="delete-cer-img"
                    onClick={() => handleCerImageDelete(i)}
                  >
                    ✕
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr className="code-popup-line" style={{ margin: 0 }} />
        <div className="code-popup-btns">
          <button
            className="code-popup-btn cancel"
            onClick={(e) => {
              setShowPopup(false);
              setCerEdit(false);
              setCerEdit(null);
            }}
          >
            Anuluj
          </button>
          <button
            className="code-popup-btn add"
            onClick={() =>
              !cerEdit ? handleAddCertyficate() : handleEditCertyficate()
            }
          >
            {cerEdit ? "Akceptuj" : "Dodaj"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddCertyficateModal;
