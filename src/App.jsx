import { useMedia } from "hooks/useMedia";
import { useLocalStorage } from "hooks/useLocalStorage";
import { useEffect } from "react";
import { useDarkMode } from "hooks/useDarkMode";

export const App = () => {
   const media = useMedia(["(max-width: 600px)"], ["red"], "blue");

   const [test, setTest] = useLocalStorage("object-cube", { name: "alejandro" });

   const [darkMode, setDarkMode] = useDarkMode();

   useEffect(() => {
      setTest(test);
   }, []);

   return (
      <>
         <h1 style={{ color: media }}>Ui-components</h1>

         <button onClick={() => setDarkMode(!darkMode)}>modo {darkMode ? "claro 🌞" : "oscuro 🌚"}</button>
      </>
   );
};

// const para = document.querySelector('p');
// const mql = window.matchMedia('(max-width: 600px)');

// function screenTest(e) {
//   if (e.matches) {
//     /* the viewport is 600 pixels wide or less */
//     para.textContent = 'This is a narrow screen — less than 600px wide.';
//     document.body.style.backgroundColor = 'red';
//   } else {
//     /* the viewport is more than 600 pixels wide */
//     para.textContent = 'This is a wide screen — more than 600px wide.';
//     document.body.style.backgroundColor = 'blue';
//   }
// }

// mql.addEventListener('change', screenTest);
