import { Children, cloneElement, isValidElement } from "react";
import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import { getChildrenByType } from "utils/validations/getChildrenType";

import css from "./Accordion.module.scss";

export const AccordionItem = ({ children: childrenProp, id, isOpen, onToggle, addClass }) => {
   // Función para abrir el accordion.
   const onExpanded = () => onToggle(id);

   /**
    * Valida si el estado es un "Array" o "Number"
    * y devuelve "true" o "false" apartir de evaluar
    * el id con el estado.
    *
    * @returns {(Boolean)}
    */
   const validation = () => {
      if (typeof isOpen === "number") {
         return isOpen === id;
      } else if (Array.isArray(isOpen)) {
         return !!isOpen.includes(id);
      } else {
         return false;
      }
   };

   const children = Children.map(childrenProp, (child) => {
      if (!isValidElement(child)) return null;

      // Comprueba si el child es de tipo AccordionItem
      if (child.props.__TYPE === "AccordionButton") {
         return cloneElement(child, { ...child.props, onExpanded, isExpanded: validation() });
      }

      return cloneElement(child, { ...child.props, isExpanded: validation() });
   });

   return (
      <div className={`${css["c-accordion__item"]} ${addClass ?? ""}`}>
         {/* Filtramos los children para solo aceptar de tipo AccordionButton y AccordionPanel. */}
         {getChildrenByType(children, ["AccordionButton", "AccordionPanel"])}
      </div>
   );
};

AccordionItem.propTypes = {
   children: PropTypes.arrayOf(PropTypes.element),
   id: PropTypes.number,
   isOpen: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
   onToggle: PropTypes.func,
   addClass: PropTypes.string,
   __TYPE: typeValidation("AccordionItem"),
};

AccordionItem.defaultProps = {
   __TYPE: "AccordionItem",
};
