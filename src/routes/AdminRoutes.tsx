import { lazy } from "react";
import { Route } from "react-router-dom";
//course
const CourseForm = lazy(
  () => import("@/layouts/admin/components/course/CourseForm")
);
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const Category = lazy(() => import("@/pages/admin/course/Category"));
const CourseView = lazy(() => import("@/pages/admin/course/CourseView"));
const List = lazy(() => import("@/pages/admin/course/List"));
const Paper = lazy(() => import("@/pages/admin/course/Paper"));
//Branch
const BranchForm = lazy(
  () => import("@/layouts/admin/components/branch/branchForm")
);
const BranchList = lazy(() => import("@/pages/admin/branch/List"));
//student
const RegisteredList = lazy(() => import("@/pages/admin/student/RegistedList"));
const StudentForm = lazy(
  () => import("@/layouts/admin/components/student/StudentForm")
);

export const AdminRoutes = [
  //course
  <Route index element={<Dashboard />} />,
  <Route path="courses" element={<List />} />,
  <Route path="courses/:id" element={<CourseView />} />,
  <Route path="courses/add" element={<CourseForm />} />,
  <Route path="course/categories" element={<Category />} />,
  <Route path="course/papers" element={<Paper />} />,
  //Branch
  <Route path="branches/add" element={<BranchForm />} />,
  <Route path="branches" element={<BranchList />} />,
  //student
  <Route path="students/registured" element={<RegisteredList />} />,
  <Route path="students/add" element={<StudentForm />} />,
];
