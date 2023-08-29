import App from "@/app";
import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
  useParams,
  useRoutes,
} from "react-router-dom";
import "./index.scss";
import Redirector from "./components/redirector";
import axios from "axios";
import { RedirectLink } from "./components/model/link";

const router = createBrowserRouter([
  {
    path: "/:slug",
    loader: async ({ params }) => {
      const { data } = await axios.get<RedirectLink>(
        `http://localhost:3001/${params.slug}`
      );
      console.log(data);
      return redirect(data.url);
    },
    errorElement: <Navigate to={"/"} replace />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
