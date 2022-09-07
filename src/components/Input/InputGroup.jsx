import { useState, Children, cloneElement, isValidElement, useEffect } from "react";
import PropTypes from "prop-types";

export const InputGroup = ({ children: childrenProps, onAllValue }) => {
   // Estado para controlar el valor de los Input.
   const [allValue, setAllValue] = useState([]);

   /**
    * Función encargada de actualzar el estado con los valores
    * provenientes del Input component.
    * @param {object} choise
    */
   const onAddValue = (choise) => setAllValue([...allValue.filter((option) => option.id !== choise.id), { ...choise }]);

   useEffect(() => {
      // Si existe la propiedad onAllValue emita el valor del estado.
      if (onAllValue) onAllValue(allValue);
   }, [allValue]);

   /**
    *
    * Función que permite modificar las propiedades de los hijos de un componente.
    *
    * @param {ReactNode[]} childs - Arreglo de children's.
    * @param {string} type - Tipo de child a modificar.
    * @param {object} properties - Objeto de propiedades para agregar a los children.
    * @returns {ReactNode[]} Arreglo de children modificados.
    */
   const setChildProperties = (childs, type, properties) => {
      return Children.toArray(childs).map((child) => {
         if (child.props.__TYPE === type) {
            return cloneElement(child, { ...child.props, ...properties });
         }
         return child;
      });
   };

   const children = Children.map(childrenProps, (child) => {
      if (!isValidElement(child)) return null;

      // Comprueba si el child es de tipo InputStyle
      if (child?.props?.__TYPE === "InputStyle") {
         // Agregamos las props necesarias en el Input.
         return cloneElement(child, { ...child.props, children: setChildProperties(child.props.children, "Input", { onValue: onAddValue }) });
      }

      // Comprueba si el child es de tipo Input
      if (child?.props?.__TYPE === "Input") {
         return cloneElement(child, { ...child.props, onValue: onAddValue });
      }

      return child;
   });

   return children;
};

InputGroup.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   onAllValue: PropTypes.func,
};
