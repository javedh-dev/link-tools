import { NewLink, RedirectLink } from "@/components/model/link";
import axios from "axios";
import { useEffect, useState } from "react";

export const useRedirectLinks = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<RedirectLink[]>([]);
  const [error, setError] = useState();

  const fetchLinks = () => {
    setLoading(true);
    axios
      .get<RedirectLink[]>("http://localhost:3001")
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const addLink = async (newLink: NewLink) => {
    const res = await axios.post<RedirectLink>(
      "http://localhost:3001",
      newLink
    );
    fetchLinks();
    console.log(data);
  };

  const updateLink = async (updatedLink: RedirectLink) => {
    const res = await axios.put<RedirectLink>(
      "http://localhost:3001",
      updatedLink
    );
    fetchLinks();
    console.log(data);
  };

  const deleteLink = async (id: string) => {
    const res = await axios.delete<RedirectLink>(`http://localhost:3001/${id}`);
    fetchLinks();
    console.log(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return { loading, data, error, fetchLinks, addLink, deleteLink, updateLink };
};
