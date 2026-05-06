import "./../../../../styles/popup.css";
import whiteWarning from "./../../../../assets/svgs/whiteWarning.svg";

function DeleteClientModal({ setShowModal, amount }) {
  return (
    <>
      <div
        className="template-modal-back-overlay"
        onClick={() => setShowModal(false)}
      />
      <div
        className="template-modal delete-modal"
        style={{ maxWidth: "425px" }}
      >
        <header className="template-modal-header">
          <div className="template-modal-info">
            <div className="template-modal-img-wrapper">
              <img src={whiteWarning} alt="" />
            </div>
            <div className="template-modal-info-text">
              <h3>Potwierdź usunięcie</h3>
            </div>
          </div>
          <span className="close-modal" onClick={() => setShowModal(false)}>
            ✕
          </span>
        </header>
        <section className="template-modal-content">
          <span className="tm-delete-text">
            Czy napewno chcesz usunąć{" "}
            <span className="dark-red">
              {amount} podopieczn{amount > 1 ? "ych" : "ego"}
            </span>
            ?
          </span>
          <div className="tm-delete-warn">
            <p>
              <span className="dark-red">Uwaga:</span> Ta akcja jest
              nieodwracalna. Wszystkie dane podopiecznych zostaną trwale
              usunięte z systemu.
            </p>
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
          <button
            className="template-modal-btn accept"
            onClick={() => setShowModal(false)}
          >
            Potwierdź
          </button>
        </section>
      </div>
    </>
  );
}

export default DeleteClientModal;
