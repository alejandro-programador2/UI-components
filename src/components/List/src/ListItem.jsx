import { Children, cloneElement } from "react";
import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import css from "./List.module.scss";

export const ListItem = ({ children: childrenProps, addClass, __TYPE, ...props }) => {
   // Recorremos los children para controlarlos
   const children = Children.map(childrenProps, (child) => {
      // Comprueba si el child es de tipo Icon
      if (child?.props?.__TYPE === "Icon") {
         // Agrega un clase personalizada para el icono
         return cloneElement(child, { ...child.props, addClass: css["c-list-item__icon"] });
      }
      return child;
   });

   return (
      <li {...(addClass && { className: `${addClass}` })} data-type={__TYPE} {...props}>
         {children}
      </li>
   );
};

ListItem.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   addClass: PropTypes.string,
   __TYPE: typeValidation("ListItem"),
};

ListItem.defaultProps = {
   __TYPE: "ListItem",
};
