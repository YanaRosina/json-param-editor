import axios from "axios";

const SERVER = "http://localhost:3001/seminars";

export const deleteSeminars = (id: number) => {
  return axios
    .delete(`${SERVER}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        console.error(
          "Ошибка при удалении семинара:",
          err.response?.data || err.message
        );
        alert(
          `Ошибка при удалении семинара: ${
            err.response?.data?.message || "Неизвестная ошибка"
          }`
        );
      } else {
        console.error("Непредвиденная ошибка:", err);
        alert("Произошла непредвиденная ошибка. Попробуйте снова.");
      }
      throw err;
    });
};
