import React, { useState } from "react";
import Modal from "./Modal";
import { deleteSeminars } from "../../api/deleteSeminar";

interface DeleteModalProps {
  onClose: () => void; // Функция закрытия модалки
  seminarId: number;
  onDeleteComplete: () => void; // Маркер для seminarlist, что бы вызвать рефреш списка семинаров
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose,
  seminarId,
  onDeleteComplete,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    //Функция сценария удаления семинара
    setIsLoading(true);
    deleteSeminars(seminarId) // Вызываем функцию для удаления семинара
      .then(() => {
        onClose(); // Закрываем модалку после успешного удаления
        onDeleteComplete(); // Обновляем список семинаров в родительском компоненте
      })
      .catch(() => {
        alert("Ошибка при удалении. Попробуйте снова."); // Ошибка, если удаление не удалось
      })
      .finally(() => setIsLoading(false)); // Снимаем состояние загрузки
  };

  return (
    <Modal
      onClose={onClose}
      onAction={handleDelete}
      actionText={isLoading ? "Удаление..." : "Удалить"}
      disabled={isLoading}
    >
      <h2>Вы уверены?</h2>
      <p>
        Вы действительно хотите удалить этот семинар?
        <br />
        Это действие нельзя отменить.
      </p>
    </Modal>
  );
};

export default DeleteModal;
