import { useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";

import css from "./Paper.module.scss";

export const Paper = ({ children, color, addClass, ...props }) => {
   const container = useRef(null);

   useLayoutEffect(() => {
      color && container.current.style.setProperty("--clr-line", `${color}`);
   }, [color]);

   return (
      <div ref={container} className={`${css["c-paper"]} ${addClass ?? ""}`} {...props}>
         {children}
      </div>
   );
};

Paper.propTypes = {
   children: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.arrayOf(PropTypes.element), PropTypes.arrayOf(PropTypes.node)]),
   addClass: PropTypes.string,
   color: PropTypes.string,
};
