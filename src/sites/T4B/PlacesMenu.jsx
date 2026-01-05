import { useEffect, useRef, useState } from 'react';
import ToTimeForBiz from './../MainPage/Loadings/ToTimeForBiz.jsx';
import './../../styles/t4b.css';
import NavBar from '../MainPage/components/NavBar.jsx';
import SideBar from '../MainPage/components/SideBar.jsx';

import stat1 from './../../assets/images/stat-icon1.png'
import stat2 from './../../assets/images/stat-icon2.png'
import stat3 from './../../assets/images/stat-icon3.png'
import angle from './../../assets/images/angle.png';
import i from './../../assets/images/i.png';
import webIcon1 from './../../assets/images/web1.png';
import webIcon2 from './../../assets/images/web2.png';
import webIcon3 from './../../assets/images/web3.png';
import orWebIcon1 from './../../assets/images/orWeb1.png';

function PlacesMenu(){
  const [isLoading, setIsLoading] = useState(true);
  const [openWebs, setOpenWebs] = useState([]);
  const [indPlaces, setIndPlaces] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000)

    return () => clearTimeout(timer);
  }, [])

  const webs = [
    {
      name: "Sieć testowa NR. 1",
      content: [
        {
          name: "Placówka Aktywny Fit",
          city: "Katowice",
          postal: "00-000",
          street: "Warszawska",
          street_number: "41",
          members: 271,
        },
        {
          name: "Siłownia garażownia",
          city: "Katowice",
          postal: "00-000",
          street: "Armii Krajowej",
          street_number: "11",
          members: 451,
        },
        {
          name: "Salka MMA",
          city: "Katowice",
          postal: "00-000",
          street: "Katowicka",
          street_number: "32",
          members: 411,
        },
      ]
    },
    {
      name: "Sieć testowa NR. 2",
      content: [
        {
          name: "Placówka Aktywny Fit",
          city: "Katowice",
          postal: "00-000",
          street: "Warszawska",
          street_number: "41",
          members: 271,
        },
        {
          name: "Siłownia garażownia",
          city: "Katowice",
          postal: "00-000",
          street: "Armii Krajowej",
          street_number: "11",
          members: 451,
        },
        {
          name: "Salka MMA",
          city: "Katowice",
          postal: "00-000",
          street: "Katowicka",
          street_number: "32",
          members: 411,
        },
      ]
    },
    {
      name: "Sieć testowa NR. 3",
      content: [
        {
          name: "Placówka Aktywny Fit",
          city: "Katowice",
          postal: "00-000",
          street: "Warszawska",
          street_number: "41",
          members: 271,
        },
        {
          name: "Siłownia garażownia",
          city: "Katowice",
          postal: "00-000",
          street: "Armii Krajowej",
          street_number: "11",
          members: 451,
        },
        {
          name: "Salka MMA",
          city: "Katowice",
          postal: "00-000",
          street: "Katowicka",
          street_number: "32",
          members: 411,
        },
      ]
    }
  ];

  const independentPlaces = [
    {
      name: "Placówka Aktywny Fit",
      city: "Katowice",
      postal: "00-000",
      street: "Warszawska",
      street_number: "41",
      members: 271,
    },
    {
      name: "Siłownia garażownia",
      city: "Katowice",
      postal: "00-000",
      street: "Armii Krajowej",
      street_number: "11",
      members: 451,
    },
    {
      name: "Salka MMA",
      city: "Katowice",
      postal: "00-000",
      street: "Katowicka",
      street_number: "32",
      members: 411,
    },
  ]
  
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
          <section className="places-web-box">
            <div className="active-places-web">
              <h2 className="places-web-title">
                Placówki w sieciach
                <img src={i} alt=""/>
              </h2>
              <div className="places-webs">
                {webs.map((web, i) => (
                  <div key={i} className="places-web">
                    <h3
                      className="places-web-name"
                      onClick={() =>
                        setOpenWebs(prev =>
                          prev.includes(i)
                            ? prev.filter(item => item !== i)
                            : [...prev, i]
                        )
                      }
                    >
                      <img
                        src={angle}
                        className={`arrow ${openWebs.includes(i) ? 'open' : ''}`}
                      />
                      <img src={stat1} height={20} width={20} />
                      {web.name}
                      <span>({web.content.length})</span>
                    </h3>
                    <div className={`places-web-wrapper ${openWebs.includes(i) ? 'open' : ''}`}>
                      <div className="places-web-inner">
                        {web.content.map((element, idx) => (
                          <div key={idx}>
                            <h4 className="web-title">
                              <img src={webIcon1} alt="" />
                              {element.name}
                            </h4>
                            <div className="web-element-content">
                              <img src={webIcon2} alt="" />
                              ul. {element.street} {element.street_number}, {element.postal} {element.city}
                              <img src={webIcon3} alt="" />
                              {element.members}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="web-line" />
            <h2 className="places-web-title">
              Placówki w sieciach
              <img src={i} alt=""/>
            </h2>
            <div className="ind-places-inner">
              {independentPlaces.map((element, i) =>
                <div key={i}>
                  <h4 className="web-title">
                    <img src={orWebIcon1} alt="" />
                    {element.name}
                  </h4>
                  <div className="web-element-content">
                    <img src={webIcon2} alt="" />
                    ul. {element.street} {element.street_number}, {element.postal} {element.city}
                    <img src={webIcon3} alt="" />
                    {element.members}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default PlacesMenu