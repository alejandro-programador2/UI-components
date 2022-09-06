import { useState, Children, cloneElement, isValidElement, useEffect } from "react";
import PropTypes from "prop-types";

export const SelectGroup = ({ children: childrenProps, onAllSelect }) => {
   // Estado para controlar el valor de los select
   const [allSelect, setAllSelect] = useState([]);

   /**
    * Función encargada de actualzar el estado con los valores
    * provenientes del select component.
    * @param {object} choise
    */
   const onAddSelect = (choise) => setAllSelect([...allSelect.filter((option) => option.id !== choise.id), { ...choise }]);

   useEffect(() => {
      // Si existe la propiedad onAllSelect emita el valor del estado
      if (onAllSelect) onAllSelect(allSelect);
   }, [allSelect]);

   const children = Children.map(childrenProps, (child) => {
      if (!isValidElement(child)) return null;

      // Comprueba si el child es de tipo Select
      if (child?.props?.__TYPE === "Select") {
         // Agregamos la función onAddSelect para obtener le valor del select
         return cloneElement(child, { ...child.props, onChoise: onAddSelect });
      }

      return child;
   });

   /* Filtramos los children para solo aceptar de tipo Select. */
   return children;
};

SelectGroup.propTypes = {
   children: PropTypes.any,
   onAllSelect: PropTypes.func,
};
