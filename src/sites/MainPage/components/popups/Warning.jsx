import { FaTriangleExclamation as Warn, FaXmark as X } from "react-icons/fa6";
import './../../../../styles/components.css';
import { useEffect } from "react";

function Warning({ content, showInfoPopup, setShowInfoPopup }){
  
  useEffect(() => {
    if (showInfoPopup) {
      const t = setTimeout(() => setShowInfoPopup(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showInfoPopup]);

  return(
    <>
      <div className="popup warn">
        <Warn className="popup-icon" />
        <div className="popup-content">
          <h2 className="popup-name">Uwaga!</h2>
          <p className="popup-desc">
            {content ?? "Wiadomość wyświetlana podczas ostrzeżenia"}
          </p>
        </div>
        <X className="popup-close-x" onClick={() => setShowInfoPopup(false)} />
      </div>
    </>
  )
}

export default Warning