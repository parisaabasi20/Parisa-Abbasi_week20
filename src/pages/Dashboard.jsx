import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./Dashboard.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../services/products";
import { useQueryClient } from "@tanstack/react-query";

import { FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import AddEditeModal from "../components/AddEditeModal";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: ({ queryKey }) => {
      const page = queryKey[1];
      return getProducts(page);
    },
  });

  const filteredProduct = search
    ? data.data.filter((p) =>
        p.name.toLowerCase().trim().includes(search.toLowerCase().trim())
      )
    : data?.data;

  const EditHandler = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const addProductMutate = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setIsModalOpen(false);
    },
  });
  const editeProductMutate = useMutation({
    mutationFn: ({ id, data }) => editProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsModalOpen(false);
    },
  });

  const CreateProductHandler = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const submitModalHandler = (formData) => {
    if (editingProduct) {
      editeProductMutate.mutate({ id: editingProduct.id, data: formData });
      console.log("ویرایش موفق", formData);
    } else {
      addProductMutate.mutate(formData);
      console.log("اضافه کردن محصول", formData);
    }
    setIsModalOpen(false);
  };

  const deleteProductMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setIsDeleteModal(false);
    },
  });

  const confirmDeleteHandler = () => {
    if (!deletingProduct) return;
    deleteProductMutate.mutate(deletingProduct.id);
  };

  const deleteHandler = (product) => {
    setDeletingProduct(product);
    setIsDeleteModal(true);
    // deleteProductMutate.mutate(product.id)
  };

  return (
    <>
      <div>
        <div className={styles.header}>
          <div className={styles.search}>
            <button>
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
              <p>{decode.username}</p>
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

              {filteredProduct?.map((product) => (
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
                    <span
                      className={styles.trashIcon}
                      onClick={() => deleteHandler(product)}
                    >
                      <GoTrash />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination
            page={currentPage}
            setPage={setCurrentPage}
            totalPages={data?.totalPages || 1}
          />
        </div>
      </div>

      <AddEditeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct || {}}
        submitModalHandler={submitModalHandler}
      />

      <DeleteModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        onConfirm={confirmDeleteHandler}
      />
    </>
  );
}

export default Dashboard;
