import React, { useState } from "react";
import Modal from "./Modal";
import { ISeminar } from "../../types/Seminar";
import { editSeminar } from "../../api/editSeminar";
import styles from "./modal.module.sass";

interface EditModalProps {
  onClose: () => void; // Функция закрытия модалки
  seminar: ISeminar;
  onEditComplete: () => void; // Маркер для seminarList, чтобы вызвать рефреш списка семинаров
}

const EditModal: React.FC<EditModalProps> = ({
  onClose,
  seminar,
  onEditComplete,
}) => {
  const formatDate = (date: string) => {
    // Преобразуем дату в формат yyyy-mm-dd
    const [day, month, year] = date.split(".");
    return `${year}-${month}-${day}`;
  };

  const [title, setTitle] = useState(seminar.title);
  const [date, setDate] = useState(formatDate(seminar.date));
  const [time, setTime] = useState(seminar.time);
  const [description, setDescription] = useState(seminar.description);
  const [isLoading, setIsLoading] = useState(false);

  // Преобразуем обратно в формат dd.mm.yyyy
  const revertDateFormat = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleEdit = () => {
    const updatedSeminar = {
      title,
      date: revertDateFormat(date), // Преобразуем обратно в исходный формат
      time,
      description,
    };
    setIsLoading(true);
    editSeminar(seminar.id, updatedSeminar)
      .then((data) => {
        onEditComplete(); // Уведомление родительскому компоненту
        onClose(); // Закрытие модалки
      })
      .catch((error) => {
        console.error("Ошибка при обновлении семинара:", error);
      });
  };

  return (
    <Modal
      onClose={onClose}
      onAction={handleEdit}
      actionText={isLoading ? "Сохранение..." : "Сохранить"}
      disabled={isLoading}
    >
      <h2>Отредактируйте данные семинара</h2>
      <div className={styles.formContainer}>
        <div className={styles.inputStringContainer}>
          <label htmlFor="title">Название:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputStringContainer}>
          <label htmlFor="date">Дата:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="time">Время:</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className={styles.inputStringContainer}>
          <label htmlFor="text">Описание:</label>
          <textarea
            id="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
