import axios from "axios";
import { ISeminar } from "../types/Seminar";

const SERVER = "http://localhost:3001/seminars";

export const editSeminar = (id: number, updatedData: Partial<ISeminar>) => {
  return axios
    .patch(`${SERVER}/${id}`, updatedData) // Используем PATCH для частичного обновления
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Ошибка при обновлении семинара:", error);
      throw error; // Прокидываем ошибку дальше
    });
};
