import { useState } from "react";

interface LangSwitchProps {
  activeLang: string;
  setActiveLang: any;
}
const LanguageSwitcher = ({ activeLang, setActiveLang }: LangSwitchProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const handleLanguageSelect = (lang: any) => {
    setActiveLang(lang);
  };

  return (
    <div className="center">
      <ul
        className={`lang ${isOpen ? "lang--open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <li
          className={`lang__item ${
            activeLang === "th" ? "lang__item--active" : ""
          }`}
          onClick={() => handleLanguageSelect("th")}
          data-lang="th"
        >
          <span className="flag flag-th"></span>
        </li>
        <li
          className={`lang__item ${
            activeLang === "vn" ? "lang__item--active" : ""
          }`}
          onClick={() => handleLanguageSelect("vn")}
          data-lang="vn"
        >
          <span className="flag flag-vn"></span>
        </li>
        <li
          className={`lang__item ${
            activeLang === "my" ? "lang__item--active" : ""
          }`}
          onClick={() => handleLanguageSelect("my")}
          data-lang="my"
        >
          <span className="flag flag-my"></span>
        </li>
        <li
          className={`lang__item ${
            activeLang === "id" ? "lang__item--active" : ""
          }`}
          onClick={() => handleLanguageSelect("id")}
          data-lang="id"
        >
          <span className="flag flag-id"></span>
        </li>
        <li
          className={`lang__item ${
            activeLang === "kh" ? "lang__item--active" : ""
          }`}
          onClick={() => handleLanguageSelect("kh")}
          data-lang="kh"
        >
          <span className="flag flag-kh"></span>
        </li>
        <li
          className={`lang__item ${
            activeLang === "ph" ? "lang__item--active" : ""
          }`}
          onClick={() => handleLanguageSelect("ph")}
          data-lang="ph"
        >
          <span className="flag flag-ph"></span>
        </li>
      </ul>

      <style>{`
        .center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .lang {
          padding-left: 0;
          display: inline-flex;
          margin: 0;
          padding: 5px;
          max-width: 40px;
          height: 40px; /* Increased height */
          overflow: hidden;
          cursor: pointer;
          transition: max-width .3s;
          border-radius: 5px;
          text-align: center;
          background: rgba(255,255,255,0.1);
        }
        
        .lang__item {
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center; /* Added for vertical centering */
          order: 2;
          margin-right: 15px;
          padding: 2px; /* Added padding */
        }
        
        .lang__item:hover {
          cursor: pointer;
        }
        
        .lang--open {
          max-width: 1000px;
          transition: max-width .4s;
        }
        
        .lang__item--active {
          order: 1;
          pointer-events: none;
        }
        
        .flag {
          width: 30px; /* Adjusted width */
          height: 22px; /* Adjusted height for proper aspect ratio */
          display: inline-block;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
        }
        
        .flag-th {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="%23A51931"/><rect width="900" height="400" y="100" fill="%23F4F5F8"/><rect width="900" height="200" y="200" fill="%232D2A4A"/></svg>');
        }
        
        .flag-vn {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="%23DA251D"/><path d="M450,150 l39,120 h126 l-102,74 l39,120 l-102-74 l-102,74 l39-120 l-102-74 h126 z" fill="%23FFFF00"/></svg>');
        }
        
        .flag-my {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="%23CC0001"/><rect width="900" height="42.86" y="42.86" fill="%23FFF"/><rect width="900" height="42.86" y="128.57" fill="%23FFF"/><rect width="900" height="42.86" y="214.29" fill="%23FFF"/><rect width="900" height="42.86" y="300" fill="%23FFF"/><rect width="900" height="42.86" y="385.71" fill="%23FFF"/><rect width="900" height="42.86" y="471.43" fill="%23FFF"/><rect width="900" height="42.86" y="557.14" fill="%23FFF"/><rect width="450" height="300" fill="%23000066"/><circle cx="150" cy="150" r="75" fill="%23FFCC00"/></svg>');
        }
        
        .flag-id {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="300" fill="%23FF0000"/><rect width="900" height="300" y="300" fill="%23FFF"/></svg>');
        }
        
        .flag-kh {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="%23032EA1"/><rect width="900" height="200" y="200" fill="%23E00025"/><path d="M450,150 v300 M300,300 h300" stroke="%23FFF" stroke-width="50"/></svg>');
        }
        
        .flag-ph {
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="300" fill="%230038A8"/><rect width="900" height="300" y="300" fill="%23CE1126"/><path d="M0,0 L450,300 L0,600" fill="%23FCD116"/><circle cx="100" cy="300" r="50" fill="%23FCD116"/></svg>');
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;
