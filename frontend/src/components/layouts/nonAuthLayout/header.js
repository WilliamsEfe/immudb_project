import React, { useEffect, useState } from "react";
import { ReactComponent as Icon } from "assets/icons/logo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { MdMenu } from "react-icons/md";
import { Close } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    });
  }, []);

  const dashboardLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Create Patient",
      link: "/create",
    },
    {
      title: "Search Patient",
      link: "/search",
    },
    {
      title: "List Patient",
      link: "/list",
    },
  ];

  if (showMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
  return (
    <header
      style={{
        boxShadow: scroll ? "0px 4px 48px rgba(226, 226, 226, 0.1)" : "",
      }}
      className="px-2"
    >
      <div className="md:h-[100px] h-[80px] flex items-center justify-between w-full ">
        <Link to="/">
          <div className="flex items-center gap-x-2">
            <span className="md:w-[100px] w-[60px] ">
              <Icon width={"inherit"} />
            </span>

            <p className="uppercase font-bold text-[#022A5D] lg:text-[24px] md:text-[20px] text-[18px]">
              MedicoSurveillance
            </p>
          </div>
        </Link>

        <div className="hidden md:flex text-[#093549] font-medium justify-around items-center w-full">
          {dashboardLinks.map(({ title, link, url }) => (
            <Link to={link} key={title}>
              <div
                className={`text-[#022A5D] text-[20px] font-semibold focus:opacity-50 ${
                  location?.pathname === link && "!border-b-2 border-[#022A5D]"
                }`}
              >
                {title}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex block md:hidden flex justify-end w-full">
          <MdMenu onClick={() => setShowMenu(!showMenu)} size="32px" />
        </div>

        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="fixed w-screen h-screen top-0 left-0 z-[9] grid place-content-center"
          >
            <div className="bg-white border border-gray-400 absolute right-0 top-[5rem] h-screen min-w-[250px] p-2 rounded-[8px] z-[99] md:hidden">
              <Close onClick={() => setShowMenu(false)} />

              <div className="flex flex-col text-[#093549] w-full font-medium gap-[36px] items-center">
                {dashboardLinks.map((i) => {
                  return (
                    <NavLink to={`${i.link}`}>
                      <p className="cursor-pointer pr-5 hover:border-b-2 hover:border-draw-animation">
                        {i.title}
                      </p>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
