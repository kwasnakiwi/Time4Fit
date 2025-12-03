import './../../../styles/loadings.css';
import loading from './../../../assets/images/loading.png';

function ToTimeForFit(){


  return(
    <>
      <main className="loading-container t4f">
        <div className="loading-circle-wrapper">
          <div className="loading-circle-box t4f">
            <div className="loading-circle t4f">
              <img src={loading} alt="" />
            </div>
          </div>
          <div className="loading-text-content t4f">
            <h3>Synchronizujemy Twoją aktywność</h3>
            <p>
              Statystyki pokazują, że trening z grupą zwiększa<br />
              motywację aż o 80%
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default ToTimeForFit