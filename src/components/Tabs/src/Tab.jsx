import { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import { TabsContext } from "components/Tabs";

import css from "./Tabs.module.scss";

export const Tab = ({ children, id, selected, addClass, icon, addNewRef, onNavigation, __TYPE, ...props }) => {
   // Referencia del botón
   const refButton = useRef();

   // Obtenemos las funciones validation y onToggle del contexto
   const { validation, onToggle } = useContext(TabsContext);

   /**
    * Devuelve "true" o "false" apartir de evaluar
    * el id con el estado.
    *
    * @returns {(Boolean)}
    */
   const isSelected = validation(id);

   useEffect(() => {
      // Agregamos al Referencia a la función addNewRef si está existe
      refButton.current && addNewRef(refButton.current);

      return () => {
         // Limpiamos la referencia al desmontar el componente
         refButton.current = null;
      };
   }, [refButton]);

   return (
      <button
         id={`tab-${id}`}
         role="tab"
         ref={refButton}
         data-type={__TYPE}
         tabIndex={`${isSelected ? 0 : -1}`}
         aria-controls={`panel-${id}`}
         aria-selected={isSelected}
         onKeyDown={onNavigation}
         onClick={() => onToggle(id)}
         className={`${css["c-tab__button"]} u-flex ${addClass ?? ""} ${isSelected && selected && selected}`}
         {...props}
      >
         {children}
         {icon && icon(isSelected)}
      </button>
   );
};

Tab.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   id: PropTypes.number,
   selected: PropTypes.string,
   addClass: PropTypes.string,
   icon: PropTypes.func,
   addNewRef: PropTypes.func,
   onNavigation: PropTypes.func,
   __TYPE: typeValidation("Tab"),
};

Tab.defaultProps = {
   __TYPE: "Tab",
};
