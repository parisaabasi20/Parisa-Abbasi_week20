import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";

import { FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import AddEditeModal from "../components/AddEditeModal";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  console.log(data);

  const searchHandler = () => {};

  const EditHandler = (product) => {
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const CreateProductHandler = () => {
    setEditProduct(null);
    setIsModalOpen(true);
  };

  const submitModalHandler = (formData) => {
    if (editProduct) {
      console.log("بروزرسانی", formData);
    } else {
      console.log("افزودن", formData);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <div className={styles.header}>
          <div className={styles.search}>
            <button onClick={searchHandler}>
              <img src="../../public/assets/search.svg" alt="" />
            </button>
            <input
              type="text"
              placeholder="جستجوی کالا"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.admin}>
            <img src="../../public/assets/image.svg" alt="" />
            <div>
              <p>میلاد اعظمی</p>
              <p>مدیر</p>
            </div>
          </div>
        </div>
        <div className={styles.productManage}>
          <div className={styles.productManage_title}>
            <img src="../../public/assets/icon2.svg" alt="icon" />
            <h3>مدیریت کالا</h3>
          </div>
          <button
            className={styles.productManage_button}
            onClick={CreateProductHandler}
          >
            افزودن محصول
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
                <th>حذف/ویرایش</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="5">در حال دریافت اطلاعات...</td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="5">خطا در دریافت اطلاعات</td>
                </tr>
              )}

              {data?.data?.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.id}</td>
                  <td>
                    <span
                      className={styles.editIcon}
                      onClick={() => EditHandler(product)}
                    >
                      <FaRegEdit />
                    </span>
                    <span className={styles.trashIcon}>
                      <GoTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
      </div>

      <AddEditeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editProduct || {}}
        submitModalHandler={submitModalHandler}
      />
    </>
  );
}

export default Dashboard;
