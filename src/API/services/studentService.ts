import api from "../axiosInstance";
import ENDPOINTS from "../endpoints";

//student API

export const addStudentAPI = async (data: any) => {
  console.log(data);
  return await api.post(ENDPOINTS.STUDENT, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRegisteredStudentsListAPI = async (data: {
  page: Number | null;
  limit: Number | null;
  search: String | null;
  sortBy: string | null;
  order: string | null;
}) => {
  return await api.get(`${ENDPOINTS.STUDENT}/registered`, {
    params: {
      page: data.page,
      limit: data.limit,
      search: data.search,
      sortBy: data.sortBy,
      order: data.order,
    },
  });
};
