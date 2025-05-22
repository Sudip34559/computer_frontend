import ENDPOINTS from "../endpoints";
import api from "../axiosInstance";

export const addCourseCategoryAPI = (data: { name: string }) => {
  return api.post(ENDPOINTS.COURSE_CATEGORY, data);
};
export const getCourseCategoryAPI = () => {
  return api.get(ENDPOINTS.COURSE_CATEGORY);
};
export const getCoursePaperAPI = () => {
  return api.get(ENDPOINTS.COURSE_PAPER);
};
export const getCourseListAPI = () => {
  return api.get(ENDPOINTS.COURSE_LIST);
};
