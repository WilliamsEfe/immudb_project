import { useEffect } from "react";
import { useLocation } from "react-router";
import PropTypes from "prop-types";

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (!location?.pathname?.includes("products")) {
      window.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    }
  }, [location]);

  return <>{children}</>;
};

ScrollToTop.propTypes = {
  children: PropTypes.any,
};

export default ScrollToTop;
