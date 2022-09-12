import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import _uniqueId from "lodash/uniqueId";

import { Icon } from "components/Icon";
import { typeValidation } from "utils/validations/typeValidation";
import css from "./CheckBox.module.scss";

/**
 * Usuario: bb-frontend-7
 * Descripción: Crea un input tipo checkbox, toggle o radio
 * param { type, label, stateInput, name, addClass }
 * - type: El tipo del input que se creará. Los valores son "radio", "checkbox" o "toggle"
 * - label: etiqueta que describirá el elemento.
 * - addClass: clase adicional que se necesite agregar al input
 **/

export const CheckBox = ({ type, label, state, name, onClick, addClass, __TYPE, ...args }) => {
   const id = useMemo(() => _uniqueId(`ui-${type}`), []);

   const [value, SetValue] = useState(name);

   /**
    * Detecta cuando se el input se activa o se desactiva y trae el id y el value
    * @param { target } - Nodo del DOM
    */

   const onChange = ({ target }) => {
      if (onClick) {
         onClick({ id: target.id, value: target.value });
      }
      SetValue(target.value);
   };

   /**
    * Determina el nombre del ícono
    * @returns String del nombre del ícono
    */

   const handleIconName = () => {
      if (state === "right") {
         return "done_all";
      } else if (state === "wrong") {
         return "close";
      } else if (type === "checkbox" && state === "normal") {
         return "check";
      } else {
         return null;
      }
   };

   return (
      <label
         htmlFor={id}
         className={`${css["c-input"]} u-flex ${addClass ?? ""}`}
         data-state={state}
         data-type={type}
         data-element={__TYPE}
         {...args}
      >
         <div className={css["c-input__box"]}>
            <input onChange={onChange} className={css["c-input__check"]} data-state={state} type={type} id={id} name={name} value={value} />
            <div className={css["c-input__icon"]}>
               <Icon name={handleIconName()} />
            </div>
         </div>
         <span className={css["c-input__label"]}>{label}</span>
      </label>
   );
};

CheckBox.propTypes = {
   label: PropTypes.string.isRequired,
   state: PropTypes.oneOf(["normal", "right", "wrong"]),
   type: PropTypes.oneOf(["radio", "checkbox"]),
   name: PropTypes.string,
   addClass: PropTypes.string,
   onClick: PropTypes.func,
   __TYPE: typeValidation("CheckBox"),
};

CheckBox.defaultProps = {
   label: "Label",
   state: "normal",
   type: "radio",
   name: "option1",
   __TYPE: "CheckBox",
};
