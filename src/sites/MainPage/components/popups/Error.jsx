import { useEffect } from "react";
import { FaXmark as X } from "react-icons/fa6";
import './../../../../styles/components.css';

function Error({ content, showInfoPopup, setShowInfoPopup }){
  
  useEffect(() => {
    if (showInfoPopup) {
      const t = setTimeout(() => setShowInfoPopup(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showInfoPopup]);


  return(
    <>
      <div className="popup error">
        <X className="popup-icon" />
        <div className="popup-content">
          <h2 className="popup-name">Coś poszło nie tak!</h2>
          <p className="popup-desc">
            {content ?? "Wiadomość wyświetlana podczas błędu"}
          </p>
        </div>
        <X className="popup-close-x" onClick={() => setShowInfoPopup(false)} />
      </div>
    </>
  )
}

export default Error