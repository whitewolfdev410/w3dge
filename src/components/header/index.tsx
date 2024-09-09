import { useLocation, Link } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";

function Headers() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <div className="container-nav fixed w-full top-0 right-0 z-50 left-0 md:hidden">
        <MobileDrawer />
      </div>
      <nav className="container-nav  justify-end fixed top-0 right-0 z-50 hidden md:flex">
        <div className="header-content flex bg-[#A5A6A5] w-fit rounded-md overflow-hidden my-8 mx-4 items-center pr-3">
          <Link
            to="/"
            className={`${
              location?.pathname === "/" ? "bg-white" : ""
            }  font-GRegular text-[16px] py-2 px-7 !font-normal`}
          >
            Network
          </Link>
          <Link
            to="/W3Node"
            className={`${
              location?.pathname === "/W3Node" ? "bg-white" : ""
            } font-GRegular text-[16px] py-2 px-7 !font-normal`}
          >
            W3Node
          </Link>
          <Link
            to="/Validators"
            className={`${
              location?.pathname === "/Validators" ? "bg-white" : ""
            } font-GRegular text-[16px] py-2 px-7 !font-normal`}
          >
            Validators
          </Link>
          <Link
            to="/Dashboard"
            className={`${
              location?.pathname === "/Dashboard" ? "bg-white" : ""
            } font-GRegular text-[16px] py-2 px-7 !font-normal`}
          >
            Dashboard
          </Link>
          <Link
            to="/Assets"
            className={`${
              location?.pathname === "/Assets" ? "bg-white" : ""
            } font-GRegular text-[16px] py-2 px-7 !font-normal`}
          >
            Assets
          </Link>
          <div
            className="w-8 h-8 rounded-full bg-grey-grey1 bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBzmw6xQCPRa23p0jXhMTLUj5VYEoGxKiA9lNEI5hOU3FfgLN-DNvcaCOfQ6Jkudj8Tgw&usqp=CAU)",
            }}
          ></div>
        </div>
      </nav>
    </div>
  );
}

export default Headers;
