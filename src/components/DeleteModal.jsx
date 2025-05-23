import styles from "./DeleteModal.module.css";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <img src="../../public/assets/icon3.svg" alt="icon" />
          <p className={styles.modalMessage}>آیا از حذف این محصول مطمئنید؟</p>
          <div className={styles.modalActions}>
            <button
              onClick={onConfirm}
              className={`${styles.modalButton} ${styles.confirmButton}`}
            >
              حذف
            </button>
            <button
              onClick={onClose}
              className={`${styles.modalButton} ${styles.cancelButton}`}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
