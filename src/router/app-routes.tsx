import AppFrame from "@/core/app-frame/app-frame";
import { Routes } from "react-router-dom";
import useMapRoutes from "./use-map-routes";

const AppRoutes = () => {
  const { routes } = useMapRoutes();
  return (
    <AppFrame>
      <Routes>{routes}</Routes>
    </AppFrame>
  );
};

export default AppRoutes;
