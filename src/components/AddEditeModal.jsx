import styles from "./AddEditeModal.module.css";

function AddEditeModal({ isOpen, onClose, submitModalHandler, product }) {
  if (!isOpen) return null;
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h2>{product.id ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = {
              name: e.target.name.value,
              quantity: e.target.quantity.value,
              price: e.target.price.value,
            };
            submitModalHandler(formData);
          }}
        >
          <label htmlFor="name">نام کالا</label>
          <input
            name="name"
            defaultValue={product.name || ""}
            placeholder="نام کالا"
            required
          />
          <label htmlFor="name">تعداد موجودی</label>
          <input
            name="quantity"
            defaultValue={product.quantity || ""}
            placeholder="تعداد موجودی"
            type="number"
            required
          />
          <label htmlFor="name">قیمت</label>
          <input
            name="price"
            defaultValue={product.price || ""}
            placeholder="قیمت"
            type="number"
            required
          />
          <div className={styles.actions}>
            <button type="submit">
              {product.id ? "ثبت اطلاعات جدید" : "ایجاد"}
            </button>
            <button onClick={onClose}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditeModal;
