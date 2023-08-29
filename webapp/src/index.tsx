import App from "@/app";
import axios from "axios";
import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { RedirectLink } from "./components/model/link";
import "./index.scss";

const apiUrl = process.env.API_URL;

const router = createBrowserRouter([
  {
    path: "/:slug",
    loader: async ({ params }) => {
      const { data } = await axios.get<RedirectLink>(
        `${apiUrl}/${params.slug}`
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
