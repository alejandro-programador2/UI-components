import PropTypes from "prop-types";
import React, { createRef, useState, useEffect } from "react";
import css from "./Video.module.scss";
import { Icon } from "components/Icon";

/**
 * Usuario: bb-frontend-7
 * Descripción: Crea un reproductor de video
 * param { url, width, addClass }
 * - url: ruta del video que será reproducido.
 * - width: ancho máximo del video.
 * - title: título del caption del video.
 * - content: descripción del caption del video.
 * - addClass: clase adicional que se le agregue al reproductor.
 **/
function Video({ url, width = "1000", hasDescription, description, addClass, src, poster, ...props }) {
   // Estado duracion del video
   const [getDurationVideo, setDurationVideo] = useState("00:00");

   // Estado del play
   const [getCurrentTime, setCurrentTime] = useState("00:00");

   // Estado del tiempo de ver el video
   const [getstateVideoPlay, setStateVideoPlay] = useState({
      state: false,
      label: "Reproducir video",
   });

   // Estado del muted
   const [getStateMuted, setStateMuted] = useState({
      state: true,
      label: "Volumen",
   });
   const [getValueVolumeeMuted, setValueVolumeMuted] = useState(100);

   // Estado de la pantalla completa
   const [getStateScreen, setStateScreen] = useState({
      state: false,
      label: "Ver en pantalla completa",
   });

   const [getValueVolume, setValueVolume] = useState(100);
   const refCont = createRef();
   const refVideo = createRef();
   const refProgress = createRef();
   const refProgressBar = createRef();
   const refVolume = createRef();
   const [captions, setCaptions] = useState(false);

   // funcion de click del play
   function handlePlay() {
      const $video = refVideo.current;
      // $video.
      if (getstateVideoPlay.state) {
         $video.pause();
         setStateVideoPlay({
            state: false,
            label: "Reproducir video",
         });
      } else {
         $video.play();
         setStateVideoPlay({
            state: true,
            label: "Pausar video",
         });
      }
   }

   // funcion del evento click de pantalla completa
   function hanldeFullScrenn() {
      const isInFullScreen =
         (document.fullscreenElement && document.fullscreenElement !== null) ||
         (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
         (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
         (document.msFullscreenElement && document.msFullscreenElement !== null);

      // const video = refVideo.current
      const docElm = refCont.current;

      if (!isInFullScreen) {
         setStateScreen({
            state: true,
            label: "Salir de pantalla completa",
         });

         if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
         } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
         } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
         } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
         }
      } else {
         setStateScreen({
            state: false,
            label: "Ver en pantalla completa",
         });

         if (document.exitFullscreen) {
            document.exitFullscreen();
         } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
         } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
         } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
         }
      }
   }

   // progreso de la barra
   function handleBarProgress() {
      const video = refVideo.current;
      const progressElem = refProgressBar.current;
      const porcent = (video.currentTime / video.duration) * 100;
      progressElem.style.flexBasis = `max(1%, ${porcent}%)`;
   }

   // tiempo de video y de progreso
   function handleTimeProcess() {
      const dataVideo = refVideo.current;
      initialValores(dataVideo);

      // funcion inicial
      function initialValores(element) {
         const durationVideo = hourToString(element.duration);
         const travelVideo = hourToString(element.currentTime);
         setCurrentTime(travelVideo);
         setDurationVideo(durationVideo);
      }

      // funcion saca segundos, minutos, horas
      function hourToString(timeSeconds) {
         const secondsNumber = parseInt(timeSeconds, 10);
         const hours = secondsNumber >= 3600 ? Math.floor(secondsNumber / 3600) : "0";
         const minutes = Math.floor((secondsNumber - hours * 3600) / 60);
         const seconds = secondsNumber - hours * 3600 - minutes * 60;
         // valores validados si son mas de dos digitos
         const validateHours = validateIsNan(validateDigits(hours));
         // se valida si el value es NaN
         const validateMinutes = validateIsNan(validateDigits(minutes));
         const validateSeconds = validateIsNan(validateDigits(seconds));

         if (secondsNumber <= 3600) {
            return `${validateMinutes}:${validateSeconds}`;
         } else {
            return `${hours === 0 ? "" : validateHours}:${validateMinutes}:${validateSeconds}`;
         }
      }

      // funcion para validar la cantidad de digitos y agregarles el 0
      function validateDigits(value) {
         if (value < 10) {
            return (value = "0" + value);
         } else {
            return value;
         }
      }
      // funcion valida si el valor ingresado es Na-n
      function validateIsNan(elem) {
         return isNaN(elem) ? "00" : elem;
      }
   }

   // funcion para adelantar o atrasar video
   function handleProcessControl(e) {
      const progress = refProgress.current;
      const video = refVideo.current;
      const positionClick = e.nativeEvent.offsetX; // se obtiene posicion del click
      const scrubTime = (positionClick / progress.offsetWidth) * video.duration; // operacion
      video.currentTime = scrubTime;
   }

   // funcion para el volumen
   function handleVolume(e) {
      const video = refVideo.current;
      const value = e.target.value;
      const volume = value / 100;
      setValueVolume(value);
      setValueVolumeMuted(value);
      video.volume = volume;

      if (!getStateMuted.state) {
         setStateMuted({
            state: true,
            label: "Volumen",
         });
      }
   }

   // funcion para muted
   const handleMuted = () => {
      if (getStateMuted.state) {
         setStateMuted({
            state: false,
            label: "Mutear video",
         });
         const video = refVideo.current;
         const value = 0;
         const volume = value;
         setValueVolume(value);
         video.volume = volume;
      } else {
         setStateMuted({
            state: true,
            label: "Volumen",
         });
         const video = refVideo.current;
         const value = getValueVolumeeMuted;
         const volume = value / 100;
         setValueVolume(value);
         video.volume = volume;
      }
   };

   const handleCaptions = function () {
      setCaptions(!captions);
   };

   useEffect(() => {
      const storage = JSON.parse(localStorage.getItem("ui-video")) || {};
      if (Object.prototype.hasOwnProperty.call(storage, "caption")) {
         setCaptions(JSON.parse(localStorage.getItem("ui-video")).caption);
         console.log(JSON.parse(localStorage.getItem("ui-video")).caption);
      }
      if (Object.prototype.hasOwnProperty.call(storage, "volume")) {
         setValueVolume(JSON.parse(localStorage.getItem("ui-video")).volume);
         console.log(JSON.parse(localStorage.getItem("ui-video")).volume);
      }
      // if (localStorage.getItem("video-volume")) {
      //    setValueVolume(localStorage.getItem("video-volume"));
      // }
   }, []);

   useEffect(() => {
      localStorage.setItem("ui-video", JSON.stringify({ caption: captions, volume: getValueVolume }));
   }, [captions, getValueVolume]);

   return (
      <figure className={`${css["c-vid-container"]} ${addClass}`} {...props}>
         <div className={`${css["c-vid"]} ${addClass}`} ref={refCont} style={{ maxWidth: `${width}px` }}>
            <video
               ref={refVideo}
               onTimeUpdate={() => {
                  // handleBarProgress();
                  handleTimeProcess();
               }}
               className={`${captions ? "" : css["no-captions"]}`}
               poster={`assets/images/${poster}.png`}
            >
               <source src={url} />
               <track src={src} label="Spanish subtitles" kind="subtitles" srcLang="es" default />
            </video>

            <div className={css["progress-content"]}>
               <div ref={refProgress} className={css.progress} onClick={handleProcessControl}>
                  <div ref={refProgressBar} className={css["progress-bar"]} onChange={handleBarProgress} />
               </div>
            </div>

            <div className={css["c-vid-controls"]}>
               <button aria-label={getstateVideoPlay.label} onClick={handlePlay} className={"tour"} data-description="Este botón reproduce el video">
                  <Icon name={getstateVideoPlay.state ? "pause" : "play"} />
               </button>

               <div className={css.flex}>
                  <button aria-label={getStateMuted.label} className={"tour"} data-description="Este botón controla el volumen" onClick={handleMuted}>
                     <Icon name={getStateMuted.state ? "volume_on" : "volume_off"} />
                  </button>
                  <label className={css["c-vid-controls-volume"]} htmlFor="volumeControl">
                     <span className="u-sr-only">Controlar volumen</span>
                     <input
                        className={css["c-vid-controls-volume-item"]}
                        ref={refVolume}
                        id="volumeControl"
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={getValueVolume}
                        onChange={handleVolume}
                        aria-valuetext={`${getValueVolume}%`}
                     />
                  </label>
               </div>

               <p className={css["c-vid-controls-text"]}>
                  <span>{getCurrentTime}</span>/<span>{getDurationVideo}</span>
               </p>

               <button aria-pressed={captions} onClick={handleCaptions} aria-label="Subtítulos" className={css.subtitles}>
                  <Icon name="closed_caption" />
               </button>

               <button aria-label={getStateScreen.label} onClick={hanldeFullScrenn}>
                  <Icon name={getStateScreen.state ? "fullscreen_exit" : "fullscreen"} />
               </button>
            </div>
         </div>
         {hasDescription ? (
            <figcaption>
               <strong>{description.title}:</strong> {description.content}
            </figcaption>
         ) : (
            <></>
         )}
      </figure>
   );
}

export { Video };

Video.propTypes = {
   url: PropTypes.string.isRequired,
   width: PropTypes.string,
   addClass: PropTypes.string,
   hasDescription: PropTypes.bool,
   description: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
   }),
   src: PropTypes.string,
   poster: PropTypes.string,
};

Video.defaultProps = {
   addClass: "",
};
