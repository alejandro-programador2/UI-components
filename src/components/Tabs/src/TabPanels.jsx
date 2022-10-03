import { Children, cloneElement, isValidElement } from "react";
import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import { getChildrenByType } from "utils/validations/getChildrenType";

import css from "./Tabs.module.scss";

export const TabPanels = ({ children: childrenProp, addClass, __TYPE, ...props }) => {
   // Necesitamos agregar la prop index en los hijos.
   const children = Children.map(childrenProp, (child, index) => {
      if (!isValidElement(child)) return null;

      return cloneElement(child, { ...child.props, id: index });
   });

   return (
      <div className={`${css["c-tab__panels"]} ${addClass ?? ""}`} data-type={__TYPE} {...props}>
         {/* Filtramos los children para solo aceptar de tipo TabPanel. */}
         {getChildrenByType(children, ["TabPanel"])}
      </div>
   );
};

TabPanels.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
   addClass: PropTypes.string,
   __TYPE: typeValidation("TabPanels"),
};

TabPanels.defaultProps = {
   __TYPE: "TabPanels",
};
