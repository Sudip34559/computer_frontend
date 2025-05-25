import CourseForm from "@/layouts/admin/components/course/CourseForm";
import Dashboard from "@/pages/admin/Dashboard";
import Category from "@/pages/admin/course/Category";
import CourseView from "@/pages/admin/course/CourseView";
import List from "@/pages/admin/course/List";
import Paper from "@/pages/admin/course/Paper";
import { Route } from "react-router-dom";

export const AdminRoutes = [
  <Route index element={<Dashboard />} />,
  <Route path="students" element={<h1>Students</h1>} />,
  <Route path="courses" element={<List />} />,
  <Route path="courses/:id" element={<CourseView />} />,
  <Route path="courses/add" element={<CourseForm />} />,
  <Route path="course/categories" element={<Category />} />,
  <Route path="course/papers" element={<Paper />} />,
];
