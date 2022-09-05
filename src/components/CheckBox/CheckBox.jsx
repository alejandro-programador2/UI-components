import _uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";
import css from "./CheckBox.module.scss";

/**
 * Usuario: bb-frontend-7
 * Descripción: Crea un input tipo checkbox, toggle o radio
 * param { type, label, stateInput, name, addClass }
 * - type: El tipo del input que se creará. Los valores son "radio", "checkbox" o "toggle"
 * - label: etiqueta que describirá el elemento.
 * - addClass: clase adicional que se necesite agregar al input
 **/

export const CheckBox = ({ type, label, state, name, addClass, ...args }) => {
  const [check, setCheck] = useState(false);
  // const [getStateIcon, setStateIcon] = useState("");
  const id = _uniqueId("ui-");

  const handleIconName = () => {
    if (state === "right") {
      return "done_all";
    } else if (state === "wrong") {
      return "close";
    } else if (type === "checkbox" && state === "normal") {
      return "check";
    } else {
      return "";
    }
  };

  // useEffect(() => {
  //   function validateIcon(element) {
  //     if (stateInput) {
  //       if (stateInput === "Error") {
  //         setStateIcon("close");
  //         element.classList.add(css["input-error"]);
  //       } else if (stateInput === "Succes") {
  //         setStateIcon("check");
  //         element.classList.add(css["input-succes"]);
  //       } else {
  //         setStateIcon("check");
  //       }
  //     } else {
  //       setStateIcon("");
  //     }
  //   }
  //   function initInputIcon() {
  //     const $contentIcon = document.querySelector(`#${id}Icon`);
  //     validateIcon($contentIcon);
  //   }
  //   initInputIcon();
  // });

  return (
    <label
      htmlFor={id}
      className={`${css["c-input"]} u-flex ${addClass}`}
      data-state={state}
      data-type={type}
      {...args}
    >
      <div className={css["c-input__box"]}>
        <input
          className={css["c-input__check"]}
          data-state={state}
          defaultChecked={check}
          type={type}
          id={id}
          name={name}
          // data-selector={inputSelector}
        />
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
};

CheckBox.defaultProps = {
  label: "Label",
  state: "normal",
  type: "radio",
  name: "option1",
  addClass: "",
};