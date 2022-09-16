import { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import _uniquedId from "lodash/uniqueId";

import { NumberInputContext } from "components/NumberInput";
import { typeValidation } from "utils/validations/typeValidation";

import css from "./NumberInput.module.scss";

export const NumberInputField = ({ addClass, isLabelVisible, label, pattern, name }) => {
   // Obtenemos las diferentes propiedades del contexto.
   const { counter, onChangeValue, onIncrementValue, onDecrementValue, min, max } = useContext(NumberInputContext);

   // Creamos el id para el input
   const input = useMemo(() => _uniquedId("c-number-input-"), []);

   // Objeto que contiene el keyCode de las teclas up, down, end y home.
   const KEYCODE = Object.freeze({
      UP: 38,
      DOWN: 40,
      END: 35,
      HOME: 36,
   });

   /**
    * Función que se ejecuta al cambio del input.
    *
    * @param {HTMLInputElement} Elemento input
    */
   const onChange = ({ target }) => {
      if (!isNaN(target.value) && target.value) {
         return onChangeValue(parseInt(target.value));
      }
      onChangeValue(0);
   };

   /**
    * Función que se ejecuta con el evento onKeyDown
    * @param {Event} e Evento
    */
   const onKeyDown = (e) => {
      switch (e.keyCode || e.which) {
         case KEYCODE.UP:
            onIncrementValue();
            break;

         case KEYCODE.DOWN:
            onDecrementValue();
            break;

         case KEYCODE.END:
            onChangeValue(max);
            break;

         case KEYCODE.HOME:
            onChangeValue(min);
            break;
      }
   };

   return (
      <label htmlFor={input} className={`${css["c-number-input__label"]} ${addClass ?? ""}`}>
         <span className={`${!isLabelVisible && "u-sr-only"}`}> {label} </span>

         <input
            type="text"
            name={name}
            inputMode="decimal"
            role="spinbutton"
            pattern={pattern}
            autoComplete="off"
            autoCorrect="off"
            className={css["c-number-input__input"]}
            onChange={onChange}
            onKeyDown={onKeyDown}
            {...(counter || counter === 0
               ? {
                    value: counter,
                    "aria-valuemax": max,
                    "aria-valuemin": min,
                    "aria-valuenow": counter,
                    "aria-valuetext": `${counter}`,
                 }
               : { value: "" })}
         />
      </label>
   );
};

NumberInputField.propTypes = {
   addClass: PropTypes.string,
   isLabelVisible: PropTypes.bool,
   label: PropTypes.string,
   pattern: PropTypes.string,
   name: PropTypes.string,
   __TYPE: typeValidation("NumberInputField"),
};

NumberInputField.defaultProps = {
   pattern: "[0-9]*(.[0-9]+)?",
   name: "number-input-field",
   label: "Default input number",
   __TYPE: "NumberInputField",
};
