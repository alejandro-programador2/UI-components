import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import { iconList } from "utils/icons/iconsList";

import css from "./Icon.module.scss";

export const Icon = ({ name, size, addClass }) => {
   /**
    * Evaluamos la propiedad name para no retonar nada si está no existe.
    */
   if (!name) {
      return null;
   }

   /**
    * Si el nombre del icono no está en el array iconList, entonces
    * se muestra un mensaje informativo.
    */
   if (!iconList.includes(name)) {
      return <span>Doesn&apos;t exist</span>;
   }

   /**
    * Se crea la URL del icono apartir del nombre de este.
    */
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
