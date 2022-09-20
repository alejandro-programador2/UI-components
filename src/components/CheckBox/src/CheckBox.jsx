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
   // Estado para controlar el valor del input.
   const [value, SetValue] = useState(name);

   // Creamos el id para el input.
   const id = useMemo(() => _uniqueId(`ui-${type}`), []);

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

   // Objecto con la lista de iconos usando dependiendo del state.
   const ICON_NAME = Object.freeze({
      right: "done_all",
      wrong: "close",
      normal: type === "checkbox" ? "check" : null,
   });

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
            <input id={id} type={type} name={name} value={value} data-state={state} className={css["c-input__check"]} onChange={onChange} />
            <div className={css["c-input__icon"]}>{ICON_NAME[state] && <Icon name={ICON_NAME[state]} />}</div>
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
