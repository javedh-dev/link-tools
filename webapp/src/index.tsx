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
import { API_URL } from "@public/config.json";

const router = createBrowserRouter([
  {
    path: "/:slug",
    loader: async ({ params }) => {
      const { data } = await axios.get<RedirectLink>(
        `${API_URL}/${params.slug}`
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
