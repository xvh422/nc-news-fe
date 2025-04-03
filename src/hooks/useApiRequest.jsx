import { useEffect, useState } from "react";

function useApiRequest(apiRequest, ...args) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    apiRequest(...args)
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        //setIsError(true);
        //console.error(err);
      });
  }, [...args]);
  return { data, isLoading, isError };
}

export default useApiRequest;
