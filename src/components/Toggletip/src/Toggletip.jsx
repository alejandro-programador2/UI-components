import { useRef, useState, createContext } from "react";
import PropTypes from "prop-types";
import { getChildrenByType } from "utils/validations/getChildrenType";

export const ToggletipContext = createContext();

export const Toggletip = ({ children }) => {
   // Estado que contrala la apertura o cierra del tooltip
   const [isOpen, setIsOpen] = useState(false);
   // Referencia del botón que abre el toggletip
   const refButton = useRef();

   /**
    * Función para abrir y cerrar el toggletip
    */
   const onOpen = () => setIsOpen(!isOpen);

   /**
    * Función para agregara la referencia del botón
    *
    * @param {HTMLElement} ref - Referencia del botón padre.
    */
   const setRefButton = (ref) => {
      if (!refButton.current) {
         refButton.current = ref;
      }
   };

   return (
      <ToggletipContext.Provider value={{ isOpen, onOpen, setRefButton, refButton }}>
         {/* Filtramos los children para aceptar solo ToggletipButton y ToggletipContent. */}
         {getChildrenByType(children, ["ToggletipButton", "ToggletipContent"])}
      </ToggletipContext.Provider>
   );
};

Toggletip.propTypes = {
   children: PropTypes.arrayOf(PropTypes.element),
};
