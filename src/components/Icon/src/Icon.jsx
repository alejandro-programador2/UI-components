import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import css from "./Icon.module.scss";

export const iconList = ["close", "check", "play", "pause", "volume_on", "volume_off", "done_all", "arrow_drop_down"];

export const Icon = ({ name, size, addClass }) => {
   if (!name) {
      return null;
   }

   if (!iconList.includes(name)) {
      return <span>Doesn&apos;t exist</span>;
   }

   const svgURL = require(`../../../assets/icons/svg/${name}.svg`);

   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         width="48"
         height="48"
         viewBox="0 0 48 48"
         className={`${css["c-icon"]} ${css[`c-${size}`]} ${addClass ?? ""}`}
         aria-hidden="true"
      >
         <use xlinkHref={`${svgURL}#${name}`}></use>
      </svg>
   );
};

Icon.propTypes = {
   name: PropTypes.oneOf(iconList),
   size: PropTypes.string,
   addClass: PropTypes.string,
   __TYPE: typeValidation("Icon"),
};

Icon.defaultProps = {
   size: "normal",
   __TYPE: "Icon",
};
