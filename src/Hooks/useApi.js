import axios from "axios";
import { useEffect } from "react";

const client = axios.create({ baseURL: "http://localhost:5000/questions" });

export function useApi(dispatch) {
  useEffect(() => {
    client
      .get("")
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data.data });
      })
      .catch((error) => {
        dispatch({ type: "dataFailed" });
      });
  }, [dispatch]);
}
