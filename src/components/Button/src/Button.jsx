import { forwardRef } from "react";
import PropTypes from "prop-types";

import { Icon, iconList } from "components/Icon";
import css from "./Button.module.scss";

/**
 * Usuario: bb-frontend-7
 * Descripción: Crea un botón.
 * param { styled, label, hasAriaLabel, icon, disabled }
 * - styled: definición del estilo del botón. La lista está en Button.propTypes
 * - label: etiqueta del botón
 * - hasAriaLabel: determina si la etiqueta será usada como un aria-label (si es true) o será mostrada como texto de forma normal (si es false)
 * - icon: determina el nombre del ícono de Google Icons que será usado.
 * - disabled: determina si el botón estará o no deshabilitado.
 **/

export const Button = forwardRef(({ label, size, icon, type, variant, hasAriaLabel, disabled, onClick, children, addClass, ...props }, ref) => {
   return (
      <button
         ref={ref}
         className={`${css["c-button"]} ${css[`c-${variant}`]} ${css[`c-${size}`]} ${icon && icon.name && hasAriaLabel ? css["c-round"] : ""} 
        ${icon && icon.position === "right" ? css["c-reverse"] : ""} u-flex ${addClass ?? ""}`}
         disabled={disabled}
         type={type}
         aria-label={hasAriaLabel ? `${label}` : undefined}
         onClick={onClick}
         {...props}
      >
         {children}
         {icon && <Icon name={icon.name} size={icon.size} />}
         {!hasAriaLabel ? label : ""}
      </button>
   );
});

Button.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   label: PropTypes.string.isRequired,
   size: PropTypes.oneOf(["small", "normal", "big"]),
   variant: PropTypes.oneOf(["primary", "secondary", "no-line"]),
   type: PropTypes.oneOf(["button", "submit", "reset"]),
   hasAriaLabel: PropTypes.bool,
   icon: PropTypes.shape({
      name: PropTypes.oneOf(iconList),
      size: PropTypes.oneOf(["small", "normal", "big"]),
      position: PropTypes.oneOf(["left", "right"]),
   }),
   disabled: PropTypes.bool,
   onClick: PropTypes.func,
   addClass: PropTypes.string,
};

Button.defaultProps = {
   label: "Button",
   size: "normal",
   variant: "primary",
   type: "button",
   hasAriaLabel: false,
};
