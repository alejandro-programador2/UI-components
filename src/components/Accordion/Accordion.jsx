import { useState, Children, cloneElement, isValidElement, useEffect } from "react";
import PropTypes from "prop-types";

import { getChildrenByType } from "utils/validations/getChildrenType";

export const Accordion = ({ children: childrenProp, allowMultiple, defaultIndex }) => {
   // Controla el estado de abierto / cerrado del AccordionItem.
   const [isOpen, setIsOpen] = useState();

   /**
    * Función para abrir o cerrar el AccordionItem.
    *
    * @param {Number} value - Id correspondiente del AccordionItem.
    */
   const onToggle = (value) => {
      if (allowMultiple) {
         if (isOpen.includes(value)) {
            setIsOpen(isOpen.filter((number) => number !== value));
         } else {
            setIsOpen([...isOpen, value]);
         }
      } else {
         setIsOpen(value);
      }
   };

   useEffect(() => {
      // Cambia el estado inicial a un Array o Number dependiendo de la prop allowMultiple.
      setIsOpen(allowMultiple ? defaultIndex || [] : defaultIndex ?? null);

      return () => {
         setIsOpen(null);
      };
   }, [allowMultiple, defaultIndex]);

   const children = Children.map(childrenProp, (child, index) => {
      if (!isValidElement(child)) return null;
      // Agregamos las props necesarias en el AccordionItem.
      return cloneElement(child, { ...child.props, id: index, isOpen, onToggle });
   });

   return (
      <div>
         {/* Filtramos los children para solo aceptar de tipo AccordionItem. */}
         {getChildrenByType(children, ["AccordionItem"])}
      </div>
   );
};

Accordion.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
   allowMultiple: PropTypes.bool,
   defaultIndex: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
};
