import { lazy } from "react";
import { Route } from "react-router-dom";
const CourseForm = lazy(
  () => import("@/layouts/admin/components/course/CourseForm")
);
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Category = lazy(() => import("@/pages/admin/course/Category"));
const CourseView = lazy(() => import("@/pages/admin/course/CourseView"));
const List = lazy(() => import("@/pages/admin/course/List"));
const Paper = lazy(() => import("@/pages/admin/course/Paper"));

export const AdminRoutes = [
  <Route index element={<Dashboard />} />,
  <Route path="students" element={<h1>Students</h1>} />,
  <Route path="courses" element={<List />} />,
  <Route path="courses/:id" element={<CourseView />} />,
  <Route path="courses/add" element={<CourseForm />} />,
  <Route path="course/categories" element={<Category />} />,
  <Route path="course/papers" element={<Paper />} />,
];
