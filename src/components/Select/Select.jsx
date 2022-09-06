import { useState, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import _uniquedId from "lodash/uniqueId";

import { Icon } from "components/Icon/Icon";
import { getChildrenByType } from "utils/validations/getChildrenType";
import { typeValidation } from "utils/validations/typeValidation";

import css from "./Select.module.scss";

export const Select = forwardRef(({ children, addClass, placeholder, label, icon, isLabelVisible, isDisabled, isRequired, onChoise }, ref) => {
   // Estado para controlar el select
   const [choise, setChoise] = useState();

   // Creamos el id para el select
   const select = useMemo(() => _uniquedId("c-select-"), []);

   const onChange = ({ target }) => {
      // Si existe la propiedad onChose emita el valor del estado
      if (onChoise) onChoise({ id: select, value: target.value });
      setChoise(target.value);
   };

   return (
      <label htmlFor={select} className={`${addClass ?? ""}`}>
         <span className={`${!isLabelVisible && "u-sr-only"}`}> {label} </span>

         <div className={css["c-select-wrapper"]}>
            <select
               id={select}
               ref={ref}
               name={select}
               value={choise}
               defaultValue={"default"}
               className={css["c-select"]}
               onChange={onChange}
               disabled={isDisabled}
               require={isRequired}
            >
               <option value={"default"} disabled>
                  {placeholder}
               </option>
               {/* Filtramos los children para solo aceptar de tipo option. */}
               {getChildrenByType(children, ["option"])}
            </select>

            <Icon name={`${icon ?? "arrow_drop_down"}`} addClass={css["c-select__icon"]} />
         </div>
      </label>
   );
});

Select.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
   addClass: PropTypes.string,
   placeholder: PropTypes.string,
   label: PropTypes.string.isRequired,
   icon: PropTypes.string,
   isLabelVisible: PropTypes.bool,
   isDisabled: PropTypes.bool,
   isRequired: PropTypes.bool,
   onChoise: PropTypes.func,
   __TYPE: typeValidation("Select"),
};

Select.defaultProps = {
   placeholder: "Select option",
   isLabelVisible: false,
   label: "Select a option",
   __TYPE: "Select",
};