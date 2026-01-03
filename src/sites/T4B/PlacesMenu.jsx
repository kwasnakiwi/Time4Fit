import { useEffect, useState } from 'react';
import ToTimeForBiz from './../MainPage/Loadings/ToTimeForBiz.jsx';
import './../../styles/t4b.css';
import NavBar from '../MainPage/components/NavBar.jsx';
import SideBar from '../MainPage/components/SideBar.jsx';

import stat1 from './../../assets/images/stat-icon1.png'
import stat2 from './../../assets/images/stat-icon2.png'
import stat3 from './../../assets/images/stat-icon3.png'
import angle from './../../assets/images/angle.png';
import 

function PlacesMenu(){
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000)
  }, [])
  
  if (isLoading) return <ToTimeForBiz />

  return(
    <>
      <NavBar 
        title="Menu wyboru placówki" 
        route="Menu wyboru placówki" 
        ist4b
      />
      <SideBar ist4b/>
      <main className="home-page-container">
        <div className="places-menu-container">
          <section className="menu-stats">
            <div className="menu-stat-box">
              <img src={stat1} alt="" />
              <div>
                <span className="menu-stat-title">Liczba sieci</span><br />
                <span className="menu-stat-value">42</span>
              </div>
            </div>
            <div className="menu-stat-box">
              <img src={stat2} alt="" />
              <div>
                <span className="menu-stat-title">Wszystkie placówki</span><br />
                <span className="menu-stat-value">42</span>
              </div>
            </div>
            <div className="menu-stat-box">
              <img src={stat3} alt="" />
              <div>
                <span className="menu-stat-title">Łączna liczba członków</span><br />
                <span className="menu-stat-value">42</span>
              </div>
            </div>
          </section>
          <section className="places-web">
            <div className="active-places-web">
              <h2 className="places-web-title">
                Placówki w sieciach
                <span> &#9432;</span>
              </h2>
              <div className="places-web">
                <h3 className="places-web-name">Sieć testowa NR. 1</h3>
                <div className="places-web-wrapper">
                  <div className="places-web-element">

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default PlacesMenu