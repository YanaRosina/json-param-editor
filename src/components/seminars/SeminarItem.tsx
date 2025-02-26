import { ISeminar } from "../../types/Seminar";
import React from "react";
import styles from "./seminar.module.sass";
import delIcon from "./XCircle.svg";

interface ISeminarItemProps extends ISeminar {
  onDeleteClick: (id: number) => void; // Пропс для вызова модалки
  onEditClick: (seminar: ISeminar) => void;
}
export const SeminarItem: React.FC<ISeminarItemProps> = ({
  id,
  title,
  description,
  date,
  time,
  photo,
  onDeleteClick,
  onEditClick,
}) => {
  const itemBackground = {
    //Тут стили для того, что бы установить нашу картинку как фон
    backgroundImage: `linear-gradient(rgba(131, 131, 131, 0.9), rgba(0, 0, 0, 0.8)), url(${photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <li className={styles.seminarItem} key={id} style={itemBackground}>
      <button className={styles.seminarDel} onClick={() => onDeleteClick(id)}>
        <img src={delIcon} alt="Del" />
      </button>

      <h2 className={styles.seminarItemTitle}>{title}</h2>
      <p className={styles.seminarItemTime}>
        {date} в <span>{time}</span>
      </p>
      <p className={styles.seminarItemText}>{description}</p>
      <button
        className={styles.seminarItemEdit}
        onClick={() => onEditClick({ id, title, time, description, date })}
      >
        Редактировать
      </button>
    </li>
  );
};
