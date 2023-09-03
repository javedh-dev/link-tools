import { NewLink, RedirectLink } from "@/components/model/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "@public/config.json";

export const useRedirectLinks = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<RedirectLink[]>([]);
  const [error, setError] = useState();

  const fetchLinks = () => {
    setLoading(true);
    console.log("URL : ", API_URL);

    axios
      .get<RedirectLink[]>(API_URL)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const addLink = async (newLink: NewLink) => {
    const res = await axios.post<RedirectLink>(API_URL, newLink);
    fetchLinks();
    console.log(data);
  };

  const updateLink = async (updatedLink: RedirectLink) => {
    const res = await axios.put<RedirectLink>(API_URL, updatedLink);
    fetchLinks();
    console.log(data);
  };

  const deleteLink = async (id: string) => {
    const res = await axios.delete<RedirectLink>(`${API_URL}${id}`);
    fetchLinks();
    console.log(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return { loading, data, error, fetchLinks, addLink, deleteLink, updateLink };
};
