import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
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
export const Video = ({ url, width = "1000", hasDescription, description, addClass, src, poster, ...props }) => {
   // Estado duracion del video
   const [getDurationVideo, setDurationVideo] = useState({
      seconds: 0,
      string: "00:00",
   });

   // Estado del play
   const [getCurrentTime, setCurrentTime] = useState({
      seconds: 0,
      string: "00:00",
   });

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
   const refCont = useRef(null);
   const refVideo = useRef(null);
   const refProgress = useRef(null);
   const refVolume = useRef(null);
   const refPulse = useRef(null);
   const [captions, setCaptions] = useState(false);

   /**
    * Cambia el video entre reproduciendo y pausado
    */

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
      refPulse.current.classList.add(`${css.active}`);
      setTimeout(() => {
         refPulse.current.classList.remove(`${css.active}`);
      }, 700);
   }

   /**
    * Cambia el video entre modo de pantalla completa o normal
    */
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

   /**
    * Calcula la posición de la barra de progreso
    */
   // function handleBarProgress() {
   //    const video = refVideo.current;
   //    const progressElem = refProgressBar.current;
   //    const porcent = (video.currentTime / video.duration) * 100;
   //    progressElem.style.flexBasis = `${porcent}%`;
   // }

   /**
    * Calcula el tiempo del video y el tiempo transcurrido y crea los strings respectivos
    */

   // funcion inicial
   function initialValues(element) {
      const durationVideo = hourToString(element.duration || 0);
      const travelVideo = hourToString(element.currentTime);
      setCurrentTime({
         seconds: element.currentTime,
         string: travelVideo,
      });
      setDurationVideo({
         seconds: Math.floor(element.duration),
         string: durationVideo,
      });
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

   /**
    * Controla la barra de progreso para que al hacer clic controle la posición del video
    * @param {event} e - Evento del video
    */
   function handleProcessControl(e) {
      const progress = refProgress.current;
      const video = refVideo.current;
      const positionClick = e.nativeEvent.offsetX; // se obtiene posicion del click
      const scrubTime = (positionClick / progress.offsetWidth) * video.duration; // operacion
      video.currentTime = scrubTime;
   }

   /**
    * Controla el volumen
    * @param {event} e - Evento del teclado
    */
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

   /**
    * Cambia el volumen de 0 a la posición actual
    */
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

   const handleProgressBar = function (e) {
      const currentTime = Math.floor(refProgress.current.getAttribute("aria-valuenow"));

      if ((e.keyCode || e.which) === 32) {
         handlePlay();
      }

      if ((e.keyCode || e.which) === 37) {
         const actualTime = currentTime - 5;
         if (actualTime >= 0) {
            refVideo.current.currentTime = actualTime;
         } else {
            refVideo.current.currentTime = 0;
         }
      }

      if ((e.keyCode || e.which) === 39) {
         const actualTime = currentTime + 5;
         if (actualTime >= refVideo.current.duration) {
            refVideo.current.currentTime = refVideo.current.duration;
         } else {
            refVideo.current.currentTime = actualTime;
         }
      }
   };

   useEffect(() => {
      const storage = JSON.parse(localStorage.getItem("ui-video")) || {};
      if (Object.prototype.hasOwnProperty.call(storage, "caption")) {
         setCaptions(JSON.parse(localStorage.getItem("ui-video")).caption);
      }
      if (Object.prototype.hasOwnProperty.call(storage, "volume")) {
         setValueVolume(JSON.parse(localStorage.getItem("ui-video")).volume);
      }
   }, []);

   useEffect(() => {
      localStorage.setItem("ui-video", JSON.stringify({ caption: captions, volume: getValueVolume }));
   }, [captions, getValueVolume]);

   // useEffect(() => {
   //    if (refVideo.current) {
   //       initialValues(refVideo.current);
   //    }
   // }, [refVideo.current]);

   return (
      <figure className={`${css["c-vid-container"]} ${addClass}`} {...props}>
         <div className={`${css["c-vid"]} ${addClass}`} ref={refCont} style={{ maxWidth: `${width}px` }}>
            <div className={css["video-wrapper"]}>
               <video
                  ref={refVideo}
                  onTimeUpdate={(event) => initialValues(event.target)}
                  onLoadedData={(event) => initialValues(event.target)}
                  className={`${captions ? "" : css["no-captions"]}`}
                  poster={`assets/images/${poster}.png`}
               >
                  <source src={url} />
                  <track src={src} label="Subtítulos en español" kind="subtitles" srcLang="es" default />
               </video>
               <div ref={refPulse} className={css["video-icon"]}>
                  <Icon name={getstateVideoPlay.state ? "play" : "pause"} />
               </div>
            </div>

            <div className={css["progress-container"]}>
               {/* <div ref={refProgress} className={css.progress} onClick={handleProcessControl}>
                  <div ref={refProgressBar} className={css["progress-bar"]} onChange={handleBarProgress} />
               </div> */}
               <div
                  role="slider"
                  aria-label="Progreso del video"
                  aria-valuemin="0"
                  aria-valuenow={getCurrentTime.seconds}
                  aria-valuemax={getDurationVideo.seconds}
                  tabIndex="0"
                  onKeyDown={(e) => handleProgressBar(e)}
                  className={css.progress}
                  onClick={handleProcessControl}
                  ref={refProgress}
               >
                  <div
                     className={css["progress-bar"]}
                     style={{
                        transform: `scaleX(calc(${getCurrentTime.seconds} / ${getDurationVideo.seconds}))`,
                     }}
                  ></div>
                  <div
                     className={css["progress-sphere"]}
                     style={{
                        left: `calc((${getCurrentTime.seconds} / ${getDurationVideo.seconds}) * 100 * 1%)`,
                     }}
                  ></div>
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
                  <span>{getCurrentTime.string}</span>/<span>{getDurationVideo.string}</span>
               </p>

               <button aria-pressed={captions} onClick={handleCaptions} aria-label="Subtítulos" className={css.subtitles}>
                  <Icon name="closed_caption" />
               </button>

               <button aria-label={getStateScreen.label} onClick={hanldeFullScrenn}>
                  <Icon name={getStateScreen.state ? "fullscreen_exit" : "fullscreen"} />
               </button>
            </div>
         </div>
         {hasDescription && (
            <figcaption>
               <strong>{description.title}:</strong> {description.content}
            </figcaption>
         )}
      </figure>
   );
};

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
