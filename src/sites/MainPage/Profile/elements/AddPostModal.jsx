import "./../../../../styles/popup.css";
import { BiX as XMark } from "react-icons/bi";
import add from "./../../../../assets/images/add_ic.png";
import cer6 from "./../../../../assets/images/cer6.png";
import { useState, useRef } from "react";
import { BASE_URL, ENDPOINTS } from "../../../../utils/Endopoints";
import { apiFetch } from "../../../../interceptor/interceptor";

function AddPostModal({setShowPostPopup, getProfileInfo}) {
  const [postHeading, setPostHeading] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [postImages, setPostImages] = useState([]);
  const postInputRef = useRef(null);

  const handlePostImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setPostImages((prev) => {
      const newItems = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...prev, ...newItems].slice(0, 5);
    });
    e.target.value = null;
  };

  const handlePostImageDelete = (index) => {
    setPostImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddPost = async () => {
    if (!postDesc || !postHeading || !postImages) return;

    const formData = new FormData();

    formData.append("description", postDesc);
    postImages.forEach((img, i) => {
      formData.append("uploaded_images", img.file);
    });

    try {
      const response = await apiFetch(`${BASE_URL}${ENDPOINTS.posts}`, {
        method: "POST",
        body: formData,
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data.error);
      }

      await getProfileInfo();
      setPostDesc("");
      setPostImages([]);
      setPostHeading("");
      setShowPostPopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 1112 }}
        className="code-popup-overlay"
        onClick={() => setShowPostPopup(false)}
      />
      <div style={{ zIndex: 1113, width: "661px" }} className="code-popup">
        <div className="code-popup-heading evd">
          <div style={{ width: "48px" }} className="popup1-box">
            <img style={{ width: "20px", height: "20px" }} src={add} alt="" />
          </div>
          <div>
            <h3>Tworzenie postu</h3>
            <p>Stwórz post</p>
            <XMark
              className="code-x"
              style={{ cursor: "pointer" }}
              onClick={(e) => setShowPostPopup(false)}
            />
          </div>
        </div>
        <div className="code-content">
          <div className="post-popup-input-box">
            <label htmlFor="postHeading">Nagłówek</label>
            <input
              type="text"
              value={postHeading}
              onChange={(e) => setPostHeading(e.target.value)}
              name="postHeading"
              className="post-popup-input"
              id="post-heading"
            />
          </div>
          <div className="post-popup-input-box">
            <label htmlFor="postDesc">Treść</label>
            <textarea
              type="text"
              value={postDesc}
              onChange={(e) => setPostDesc(e.target.value)}
              name="postDesc"
              className="post-popup-input"
              id="post-desc"
              maxLength={600}
            />
            <span className="post-desc-counter">
              {postDesc.length || 0}/600
            </span>
          </div>
          <label
            htmlFor="post-images"
            style={{ display: "block", marginBottom: "16px" }}
          >
            <img
              style={{ display: "inline-block", marginRight: "8px" }}
              src={cer6}
              alt=""
            />
            Zdjęcia
          </label>
          <div className="post-images-box">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={postInputRef}
              onChange={handlePostImagesChange}
              name="post-images"
            />
            {postImages.length < 5 && (
              <div
                onClick={() => postInputRef.current.click()}
                className="add-post-box post-img"
              >
                <span>+</span>
              </div>
            )}
            <div className="post-images">
              {postImages.map((img, i) => (
                <div key={i} className="post-img-box">
                  <img src={img.preview} className="post-image" alt="" />
                  <div
                    onClick={() => handlePostImageDelete(i)}
                    className="delete-post-image"
                  >
                    ✕
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className="code-popup-line" />
        <div className="code-popup-btns">
          <button
            className="code-popup-btn cancel"
            onClick={(e) => setShowPostPopup(false)}
          >
            Anuluj
          </button>
          <button className="code-popup-btn add" onClick={handleAddPost}>
            Dodaj
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPostModal;
