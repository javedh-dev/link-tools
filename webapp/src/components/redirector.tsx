import axios from "axios";
import { redirect, useParams } from "react-router-dom";
import { RedirectLink } from "./model/link";

const Redirector = () => {
  const { slug } = useParams();
  axios
    .get<RedirectLink>(`http://localhost:3001/${slug}`)
    .then((res) => {
      console.log(res);
      redirect(res.data.url);
    })
    .catch((err) => {
      console.log(err);
      redirect("/");
    });
  return <h1>Redirecting...</h1>;
};

export default Redirector;
