import React from "react";
import styles from "./modal.module.sass";

interface ModalProps {
  onClose: () => void; // Функция закрытия модалки
  onAction: () => void; // Функция действия (например, удалить или редактировать)
  actionText: string; // Текст кнопки действия
  children: React.ReactNode; // Контент модалки
  disabled?: boolean; //Состояние для кнопки
}

const Modal: React.FC<ModalProps> = ({
  onClose,
  onAction,
  actionText,
  children,
  disabled = false,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children} {/* Контент модалки */}
        <div className={styles.modalActions}>
          <button className={styles.modalButton} onClick={onClose}>
            Назад
          </button>
          <button
            className={styles.modalButton}
            onClick={onAction}
            disabled={disabled}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
