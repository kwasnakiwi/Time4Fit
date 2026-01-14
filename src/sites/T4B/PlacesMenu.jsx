import { useEffect, useState } from 'react';
import ToTimeForBiz from './../MainPage/Loadings/ToTimeForBiz.jsx';
import './../../styles/t4b.css';
import NavBar from '../MainPage/components/NavBar.jsx';
import SideBar from '../MainPage/components/SideBar.jsx';
import Error from './../MainPage/components/popups/Error.jsx'
import { getErrorMessage } from './../../utils/error codes/ErrorHandler.jsx';

import stat1 from './../../assets/images/stat-icon1.png';
import stat2 from './../../assets/images/stat-icon2.png';
import stat3 from './../../assets/images/stat-icon3.png';
import angle from './../../assets/images/angle.png';
import i from './../../assets/images/i.png';
import webIcon1 from './../../assets/images/web1.png';
import sWebIcon1 from './../../assets/images/hover.png';
import webIcon2 from './../../assets/images/web2.png';
import webIcon3 from './../../assets/images/web3.png';
import orWebIcon1 from './../../assets/images/orWeb1.png';

const initialWebs = [
  {
    name: 'Sieć testowa NR. 1',
    content: [
      {
        name: 'Placówka Aktywny Fit',
        city: 'Katowice',
        postal: '00-000',
        street: 'Warszawska',
        street_number: '41',
        members: 271,
      },
    ],
  },
  {
    name: 'Sieć testowa NR. 2',
    content: [],
  },
  {
    name: 'Sieć testowa NR. 3',
    content: [],
  },
];

const initialIndependentPlaces = [
  {
    name: 'Siłownia garażownia',
    city: 'Katowice',
    postal: '40-300',
    street: 'Armii Krajowej',
    street_number: '11',
    members: 451,
  },
  {
    name: 'Salka MMA',
    city: 'Katowice',
    postal: '40-045',
    street: 'Katowicka',
    street_number: '32',
    members: 411,
  },
  {
    name: 'Studio Jogi Balance',
    city: 'Tychy',
    postal: '43-100',
    street: 'Niepodległości',
    street_number: '67',
    members: 88,
  },
  {
    name: 'Box Training Club',
    city: 'Sosnowiec',
    postal: '41-200',
    street: '3 Maja',
    street_number: '19',
    members: 134,
  },
  {
    name: 'Fit Women Space',
    city: 'Bytom',
    postal: '41-902',
    street: 'Dworcowa',
    street_number: '4',
    members: 76,
  },
  {
    name: 'Calisthenics Spot',
    city: 'Zabrze',
    postal: '41-800',
    street: 'Roosevelta',
    street_number: '102',
    members: 59,
  },
  {
    name: 'Rehab & Mobility Lab',
    city: 'Ruda Śląska',
    postal: '41-700',
    street: 'Piastowska',
    street_number: '28',
    members: 64,
  },
  {
    name: 'Personal Training Studio',
    city: 'Dąbrowa Górnicza',
    postal: '41-300',
    street: 'Krasińskiego',
    street_number: '15',
    members: 92,
  },
  {
    name: 'Cross Performance',
    city: 'Gliwice',
    postal: '44-100',
    street: 'Zwycięstwa',
    street_number: '45',
    members: 121,
  },
  {
    name: 'Power Stretch Studio',
    city: 'Chorzów',
    postal: '41-500',
    street: 'Wolności',
    street_number: '88',
    members: 57,
  },
  {
    name: 'Iron Basement Gym',
    city: 'Siemianowice Śląskie',
    postal: '41-100',
    street: 'Śląska',
    street_number: '9',
    members: 173,
  },
  {
    name: 'Functional Movement Lab',
    city: 'Mysłowice',
    postal: '41-400',
    street: 'Towarowa',
    street_number: '6',
    members: 69,
  },
];

const apiError = {
  error: "You don't have permissions to invite users to this event",
  code: "no_permissions",
};

function PlacesMenu() {
  const [isLoading, setIsLoading] = useState(true);
  const [openWebs, setOpenWebs] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null)
  const [webs, setWebs] = useState(initialWebs);
  const [independentPlaces, setIndependentPlaces] = useState(initialIndependentPlaces);
  const [showPopup, setShowPopup] = useState(false);
  const [pendingDrop, setPendingDrop] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDrop = (e, webIndex) => {
    e.preventDefault();

    const data = JSON.parse(e.dataTransfer.getData('place'));
    const { element, index } = data;

    setPendingDrop({ webIndex, element, index });
    setShowPopup(true);
  }

  const confirmAddPlace = () => {
    if (!pendingDrop) return;

    const { webIndex, element, index } = pendingDrop;

    setWebs((prev) =>
      prev.map((web, i) =>
        i === webIndex
          ? { ...web, content: [...web.content, element] }
          : web
      )
    )

    setIndependentPlaces((prev) =>
      prev.filter((_, i) => i !== index)
    )

    setPendingDrop(null);
    setShowPopup(false);
  }

  const cancelAddPlace = () => {
    setPendingDrop(null);
    setShowPopup(false);
  }


  if (isLoading) return <ToTimeForBiz />;

  const language = "es"

  return (
    <>
      <Error content={getErrorMessage(apiError.code, language)}/>
      <NavBar title="Menu wyboru placówki" route="Menu wyboru placówki" ist4b />
      <SideBar ist4b />
      {showPopup &&
        <div className="place-add-popup" style={{position: "absolute", left: "50%", zIndex: 122, background: "var(--primary-orange)", width: "300px", height: "300px"}}>
          UWAGA
          <button onClick={() => confirmAddPlace()}>OK</button>
          <button onClick={() => cancelAddPlace()}>NIE</button>
        </div>
      }
      <main className="home-page-container">
        <div className="places-menu-container">
          <section className="menu-stats">
            <div className="menu-stat-box">
              <img src={stat1} alt="" />
              <div>
                <span className="menu-stat-title">Liczba sieci</span>
                <br />
                <span className="menu-stat-value">{webs.length}</span>
              </div>
            </div>
            <div className="menu-stat-box">
              <img src={stat2} alt="" />
              <div>
                <span className="menu-stat-title">Wszystkie placówki</span>
                <br />
                <span className="menu-stat-value">
                  42
                </span>
              </div>
            </div>
            <div className="menu-stat-box">
              <img src={stat3} alt="" />
              <div>
                <span className="menu-stat-title">Łączna liczba członków</span>
                <br />
                <span className="menu-stat-value">—</span>
              </div>
            </div>
          </section>

          <section className="places-web-box">
            <div className="active-places-web">
              <h2 className="places-web-title">
                Placówki w sieciach <img src={i} alt="" />
              </h2>

              {webs.map((web, i) => (
                <div key={i} className="places-web">
                  <h3
                    className="places-web-name"
                    onClick={() =>
                      setOpenWebs((prev) =>
                        prev.includes(i)
                          ? prev.filter((x) => x !== i)
                          : [...prev, i]
                      )
                    }
                    onDragEnter={() => {
                      if (!openWebs.includes(i)) {
                        setOpenWebs(prev => [...prev, i]);
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, i)}
                  >
                    <img
                      src={angle}
                      className={`arrow ${
                        openWebs.includes(i) ? 'open' : ''
                      }`}
                    />
                    <img src={stat1} height={20} width={20} />
                    {web.name}
                    <span>({web.content.length})</span>
                  </h3>

                  <div
                    className={`places-web-wrapper ${
                      openWebs.includes(i) ? 'open' : ''
                    }`}
                  >
                    <div
                      className="places-web-inner"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, i)}
                    >
                      {web.content.length === 0 && (
                        <div className="empty-drop-zone" style={{background: "transparent", cursor: "default"}}>
                          Upuść tutaj placówkę
                        </div>
                      )}
                      <div className="places-map-line" />

                      {web.content.map((el, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() =>
                            setHoveredItem(`${i}-${idx}`)
                          }
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <h4 className="web-title">
                            <img
                              src={
                                hoveredItem === `${i}-${idx}`
                                  ? sWebIcon1
                                  : webIcon1
                              }
                              alt=""
                            />
                            {el.name}
                          </h4>
                          <div className="web-element-content">
                            <img src={webIcon2} alt="" />
                            ul. {el.street} {el.street_number},{' '}
                            {el.postal} {el.city}
                            <img src={webIcon3} alt="" />
                            {el.members}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="web-line" />

            <h3 className="places-web-title">
              Niezależne placówki <img src={i} alt="" />
            </h3>

            <div className="ind-places-inner">
              <div className="places-map-line orange" />
              {independentPlaces.map((el, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      'place',
                      JSON.stringify({ element: el, index: i })
                    )
                    const ghost = document.createElement('div');
                    ghost.className = 'drag-ghost';
                    ghost.innerHTML = `
                      <h4 class="web-title">
                        <img src="${orWebIcon1}" alt="" />
                        ${el.name}
                      </h4>
                      <div class="web-element-content">
                        <img src="${webIcon2}" alt="" />
                        ul. ${el.street} ${el.street_number},${' '}
                        ${el.postal} ${el.city}
                        <img src="${webIcon3}" alt="" />
                        ${el.members}
                      </div>
                    `;

                    document.body.appendChild(ghost);
                    e.dataTransfer.setDragImage(ghost, 20, 20);

                    e.dataTransfer.setData(
                      'place',
                      JSON.stringify({ element: el, index: i })
                    );

                    setTimeout(() => document.body.removeChild(ghost), 0);
                  }}
                >
                  <h4 className="web-title">
                    <img src={orWebIcon1} alt="" />
                    {el.name}
                  </h4>
                  <div className="web-element-content">
                    <img src={webIcon2} alt="" />
                    ul. {el.street} {el.street_number},{' '}
                    {el.postal} {el.city}
                    <img src={webIcon3} alt="" />
                    {el.members}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default PlacesMenu;
