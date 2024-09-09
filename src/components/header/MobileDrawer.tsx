import React, { useState } from "react";
import LogoText from "../../assets/images/LogoText.png";
import { Link } from "react-router-dom";

const MobileDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="flex justify-between items-center  h-fit py-4 px-5 w-full bg-gray-900">
        <img src={LogoText} />
        <button
          onClick={toggleDrawer}
          className="p-3 focus:outline-none h-fit bg-primary-main rounded-md text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </header>

      {/* Drawer Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full z-50 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between p-4 border-b border-grey-grey1">
          <img src={LogoText} style={{ width: "120px" }} />
          <button onClick={toggleDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center py-5">
          <div
            className="w-20 h-20 rounded-full bg-grey-grey1 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBzmw6xQCPRa23p0jXhMTLUj5VYEoGxKiA9lNEI5hOU3FfgLN-DNvcaCOfQ6Jkudj8Tgw&usqp=CAU)",
            }}
          ></div>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li onClick={toggleDrawer}>
              <Link to="/" className="hover:text-primary-main ">
                Network
              </Link>
            </li>
            <li onClick={toggleDrawer}>
              <Link to="/W3Node" className="hover:text-primary-main">
                W3Node
              </Link>
            </li>
            <li onClick={toggleDrawer}>
              <Link to="/Validators" className="hover:text-primary-main">
                Validators
              </Link>
            </li>
            <li onClick={toggleDrawer}>
              <Link to="/Dashboard" className="hover:text-primary-main">
                Dashboard
              </Link>
            </li>
            <li onClick={toggleDrawer}>
              <Link to="/Assets" className="hover:text-primary-main">
                Assets
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay (for closing the drawer when clicking outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
};

export default MobileDrawer;
