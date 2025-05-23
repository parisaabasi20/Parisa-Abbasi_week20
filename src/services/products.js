import api from "../configs/api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post("/products", productData);
  return response.data;
};

export const editProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};


export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
