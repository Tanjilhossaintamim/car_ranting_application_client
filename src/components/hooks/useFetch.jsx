import { useEffect, useState } from "react";
import { fetchDatafromApi } from "../utils/fetchDatafromApi";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [is_loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchDatafromApi(endpoint)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [endpoint]);
  return { data, is_loading, error };
};

export default useFetch;
