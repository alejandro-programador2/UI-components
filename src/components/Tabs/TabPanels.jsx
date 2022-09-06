import { Children, cloneElement, isValidElement } from "react";
import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import { getChildrenByType } from "utils/validations/getChildrenType";

import css from "./Tabs.module.scss";

export const TabPanels = ({ children: childrenProp, addClass, ...props }) => {
   const children = Children.map(childrenProp, (child, index) => {
      if (!isValidElement(child)) return null;
      // Agregamos las props necesarias en el TabPanel.
      return cloneElement(child, { ...child.props, id: index });
   });

   return (
      <div className={`${css["c-tab__panels"]} ${addClass ?? ""}`} {...props}>
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
