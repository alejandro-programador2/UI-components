import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { usePortal } from "hooks/usePortal";

export const Portal = ({ children, id }) => {
   const target = usePortal(id);
   return createPortal(children, target);
};

Portal.propTypes = {
   children: PropTypes.any,
   id: PropTypes.string.isRequired,
};
