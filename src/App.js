import { Routes, Route, Link } from "react-router-dom"
import { Main, Stats } from "./pages";

export const App = () => {
  

  return (
    <>
    <Routes>
      <Route path="/" element={ <Main/> } />
      <Route path="/statistics" element={ <Stats/> } />
    </Routes>
    </>
  );
};
