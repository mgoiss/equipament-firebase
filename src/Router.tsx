import { Navigate, useRoutes } from "react-router-dom";
import PageClient from "./page/client";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to={"/cliente"} replace={true} />,
    },
    {
      path: "/cliente",
      element: <PageClient />,
    },
  ]);
};

export default Router;
