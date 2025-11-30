import { FaCheck as Check, FaXmark as X } from "react-icons/fa6";
import './../../../../styles/components.css';
import { useEffect } from "react";

function Success({ content, showInfoPopup, setShowInfoPopup }){
  
  useEffect(() => {
    if (showInfoPopup) {
      const t = setTimeout(() => setShowInfoPopup(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showInfoPopup]);

  return(
    <>
      <div className="popup success">
        <Check className="popup-icon" />
        <div className="popup-content">
          <h2 className="popup-name">Sukces!</h2>
          <p className="popup-desc">
            {content ?? "Wiadomość wyświetlana po zakończeniu pomyślnym"}
          </p>
        </div>
        <X className="popup-close-x" onClick={() => setShowInfoPopup(false)} />
      </div>
    </>
  )
}

export default Success