import "wicg-inert";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Button } from "../Button/Button";
import css from "./Modal.module.scss";
import iconLibrary from "../Icon/Icon";

export const Modal = ({ button, addClass, children, isOpen, ...props }) => {
  const [hiddenModal, setHiddenModal] = useState(true);
  const refButton = useRef(null);
  const refModal = useRef(null);

  const toggleModal = (state) => {
    const noModalZones = document.querySelector("#root");
    setHiddenModal(state);
    noModalZones.inert = !state;
    if (state === true) {
      refButton.current.focus();
    } else {
      refModal.current.focus();
    }
  };

  useEffect(() => {
    isOpen && isOpen(!hiddenModal);
  }, [hiddenModal]);

  return (
    <>
      <Button
        ref={refButton}
        label={button.label}
        size={button.size}
        icon={{
          name: button?.icon?.name,
          size: button?.icon?.size,
          position: button?.icon?.position,
        }}
        type={button.type}
        variant={button.variant}
        hasAriaLabel={button.hasAriaLabel}
        disabled={button.disabled}
        children={button.children}
        addClass={button.addClass}
        onClick={() => toggleModal(false)}
        aria-haspopoup="dialog"
      />
      {ReactDOM.createPortal(
        <>
          <div
            className={css["c-layout"]}
            onClick={() => toggleModal(true)}
            hidden={hiddenModal}
          ></div>
          <div
            role="dialog"
            tabIndex="-1"
            hidden={hiddenModal}
            aria-label={button.label}
            ref={refModal}
            aria-modal="true"
            className={`${css["c-modal"]} u-px-3 u-py-3 ${addClass}`}
            {...props}
          >
            <div className={`${css["c-modal-container"]} u-flow`}>
              {children}
            </div>
            <Button
              addClass={css["c-close-button"]}
              label="Cerrar modal"
              hasAriaLabel={true}
              icon={{ name: "close" }}
              onClick={() => toggleModal(true)}
            />
          </div>
        </>,
        document.getElementById("modal")
      )}
    </>
  );
};

Modal.propTypes = {
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    size: PropTypes.oneOf("small", "normal", "big"),
    variant: PropTypes.oneOf("primary", "secondary", "no-line"),
    type: PropTypes.oneOf("button", "submit", "reset"),
    hasAriaLabel: PropTypes.bool,
    icon: PropTypes.shape({
      name: PropTypes.oneOf(iconLibrary),
      size: PropTypes.oneOf("small", "normal", "big"),
      position: PropTypes.oneOf("left", "right"),
    }),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    addClass: PropTypes.string,
  }),
  addClass: PropTypes.string,
  isOpen: PropTypes.func,
};

Modal.defaultProps = {
  button: {
    label: "Abrir modal",
    icon: {
      name: "",
    },
  },
  addClass: "",
  isOpen: undefined,
};