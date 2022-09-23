import { useState } from "react";
import PropTypes from "prop-types";

import css from "./Image.module.scss";
import base from "assets/images/base-image.png";

export const Image = ({ url, alt, title, width, addClass, noCaption, ...props }) => {
   const [error, setError] = useState(false);
   // funcion de error, al no conseguir la imagen cambia el estado
   const onError = (value) => setError(value);

   // if ternario donde al no conseguir la imagen enviada muestra una por default
   const imgToSee = !error ? `${url}` : base;

   return (
      <figure className={`${css["c-image"]} ${addClass ?? ""}`} {...(width && { style: { maxWidth: `${width}px` } })}>
         <img src={imgToSee} onError={onError} alt={alt} {...props} />

         {!noCaption && (
            <figcaption className={css["c-image__figcaption"]}>
               <p>
                  <strong>{title}&nbsp;</strong>
                  {alt}
               </p>
            </figcaption>
         )}
      </figure>
   );
};

Image.defaultProps = {
   title: "Image 1.",
   alt: "Default image.",
   noCaption: false,
};

Image.propTypes = {
   url: PropTypes.string,
   alt: PropTypes.string,
   title: PropTypes.string,
   width: PropTypes.string,
   addClass: PropTypes.string,
   noCaption: PropTypes.bool,
};
