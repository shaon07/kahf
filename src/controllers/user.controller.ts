import api from "@/config/axios";

export const getUserDetail = async (id: string) => {
  return await api.get(`/users/${id}`).then((res) => res.data);
};

export const updateUser = async (id: string, data: any) => {
  const formData = new FormData();
  data.picture && formData.append("picture", data.picture);
  data?.email && formData.append("email", data.email);
  data?.firstname && formData.append("firstname", data.firstname);
  data?.lastname && formData.append("lastname", data.lastname);
  data.socialLinks && formData.append("socialLinks", JSON.stringify(data.socialLinks));
  return await api
    .patch(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const loginUser = async (data: any) => {
  return await api.post(`/users/login`, data).then((res) => res.data);
};

export const registerUser = async (data: any) => {
  return await api.post(`/users/register`, data).then((res) => res.data);
};

export const logoutUser = async () => {
  return await api.get(`/users/logout`).then((res) => res.data);
};
