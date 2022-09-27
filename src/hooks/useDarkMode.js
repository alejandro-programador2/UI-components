import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMedia } from "./useMedia";

const useDarkMode = () => {
   const [enableState, setEnableState] = useLocalStorage("dark-mode-enabled");

   const prefersDarkMode = useMedia(["(prefers-color-scheme: dark)"], [true], false);

   const enabled = typeof enableState !== "undefined" ? enableState : prefersDarkMode;

   useEffect(() => {
      setEnableState(prefersDarkMode);
   }, [prefersDarkMode]);

   useEffect(() => {
      const bodyElement = window.document.body;

      if (enabled) {
         bodyElement.setAttribute("data-dark-mode", enabled);
      } else {
         bodyElement.removeAttribute("data-dark-mode", enabled);
      }
   }, [enabled]);

   return [enabled, setEnableState];
};

export { useDarkMode };
