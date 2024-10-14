import api from "@/config/axios";

export const getUserDetail = async (id: string) => {
  return await api.get(`/users/${id}`).then((res) => res.data);
}

export const updateProduct = async (id: string, data: any) => {
  return await api.put(`/products/${id}`, data).then((res) => res.data);
};


export const loginUser = async (data: any) => {
  return await api.post(`/users/login`, data).then((res) => res.data);
}