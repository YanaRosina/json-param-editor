import axios from "axios";
import { ISeminar } from "../types/Seminar";

const SERVER = "http://localhost:3001/seminars";

export const displaySeminars = (): Promise<ISeminar[] | null> => {
  return axios
    .get(`${SERVER}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
