import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/route";

const AppRouter = () => {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          path={path}
          element={element}
          key={path} />
      ))}
    </Routes>
  )
};

export default AppRouter;
