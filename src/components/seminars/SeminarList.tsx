import React, { useEffect, useState } from "react";
import { displaySeminars } from "../../api/displaySeminars";
import { ISeminar } from "../../types/Seminar";
import { SeminarItem } from "./SeminarItem";
import styles from "./seminar.module.sass";
import DeleteModal from "../dialog/DeleteModal";
import EditModal from "../dialog/EditModal";

const SeminarsList: React.FC = () => {
  const [seminars, setSeminars] = useState<ISeminar[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectSeminarParams, setSelectSeminarParams] = useState<ISeminar>();
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSeminarId, setSelectedSeminarId] = useState<number | null>(
    null
  );

  const [refreshData, setRefreshData] = useState(false); // Состояние для обновления данных

  const fetchSeminars = async () => {
    setIsLoading(true);
    try {
      const data = await displaySeminars(); // Загружаем список семинаров
      setSeminars(data || []); // Если данных нет, устанавливаем пустой массив
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем семинары при монтировании компонента и при изменении refreshData
  useEffect(() => {
    fetchSeminars();
  }, [refreshData]); // Данные будут обновляться при изменении refreshData

  // Обработчик клика по кнопке удаления
  const handleDeleteClick = (seminarId: number) => {
    setSelectedSeminarId(seminarId); // Устанавливаем id семинара, который нужно удалить
    setIsDelModalOpen(true); // Открываем модалку
  };
  // Обработчик клика по кнопке редактирования
  const handleEditClick = (seminar: ISeminar) => {
    setSelectSeminarParams(seminar);
    setIsEditModalOpen(true);
  };

  // Функция для обработки завершения удаления или редактирование
  const handleComplete = () => {
    setRefreshData(!refreshData); // Меняем состояние, чтобы вызвать перезагрузку данных
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <ul className={styles.seminarList}>
          {seminars.map((seminar) => (
            <SeminarItem
              key={seminar.id}
              {...seminar}
              onDeleteClick={handleDeleteClick} // Передаем обработчик клика по кнопке удаления
              onEditClick={handleEditClick}
            />
          ))}
        </ul>
      )}

      {isDelModalOpen && selectedSeminarId && (
        <DeleteModal
          onClose={() => setIsDelModalOpen(false)} // Закрытие модалки
          onDeleteComplete={handleComplete} // Обновление данных после удаления
          seminarId={selectedSeminarId} // Передаем id семинара для удаления
        />
      )}

      {isEditModalOpen && selectSeminarParams && (
        <EditModal
          onClose={() => setIsEditModalOpen(false)} // Закрытие модалки
          onEditComplete={handleComplete} // Обновление данных после редактирования
          seminar={selectSeminarParams}
        />
      )}
    </div>
  );
};

export default SeminarsList;
