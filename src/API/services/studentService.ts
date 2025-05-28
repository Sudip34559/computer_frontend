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

export const getStudentsListAPI = async (data: {
  page: Number | null;
  limit: Number | null;
  search: String | null;
  sortBy: string | null;
  order: string | null;
  status: string;
}) => {
  // console.log(data.status);

  return await api.get(ENDPOINTS.STUDENT, {
    params: {
      page: data.page,
      limit: data.limit,
      search: data.search,
      sortBy: data.sortBy,
      order: data.order,
      status: data.status,
    },
  });
};
