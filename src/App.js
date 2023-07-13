import { Routes, Route, Link } from "react-router-dom"
import { Main, Stats } from "./pages";
import { routes } from "./helpers/routes";

export const App = () => {

  return (
    <>
    <Routes>
      <Route path={routes.root} element={ <Main/> } />
      <Route path={routes.report} element={ <Stats/> } />
    </Routes>
    </>
  );
};
