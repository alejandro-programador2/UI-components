import { cloneElement } from "react";
import PropTypes from "prop-types";

import { Icon } from "components/Icon";

import css from "./Pagination.module.scss";

export const PaginationItem = ({ page, type, addClass, disabled, element, icons, selected, ...props }) => {
   // Objeto que contiene los diferentes tipos de iconos a utilizar.
   const normalizedIcons = {
      previous: icons.previous || "navigate_before",
      next: icons.next || "navigate_next",
      last: icons.last || "last_page",
      first: icons.first || "first_page",
   };

   // Variable que contiene el icono a utilizar dependiendo de la propieda type.
   const icon = normalizedIcons[type];

   return type === "start-ellipsis" || type === "end-ellipsis" ? (
      // Devolvemos '...' si es de tipo ellipsis.
      <div className={css["c-pagination-item__ellipsis"]}>...</div>
   ) : (
      cloneElement(
         element,
         {
            disabled,
            className: `${css["c-pagination-item"]} ${addClass ?? ""} ${selected ? css["c-pagination-item--selected"] : ""}`,
            ...element.props,
            ...props,
         },
         [
            // Si es de tipo página colocar la página e.g 1,2,3.
            type === "page" && page,
            // Si existe el icono agregarlo e.g icon = 'last_page'
            icon ? <Icon name={icon} key={type} /> : null,
         ]
      )
   );
};

PaginationItem.propTypes = {
   page: PropTypes.number,
   type: PropTypes.string,
   addClass: PropTypes.string,
   disabled: PropTypes.bool,
   selected: PropTypes.bool,
   element: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.string]),
   icons: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
      next: PropTypes.string,
      previous: PropTypes.string,
   }),
};

PaginationItem.defaultProps = {
   icons: {
      previous: "navigate_before",
      next: "navigate_next",
      last: "last_page",
      first: "first_page",
   },
   element: <button />,
};
