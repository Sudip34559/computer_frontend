import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import type { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "./reducer/auth";
import Login from "./pages/auth/Login";
import LoginRP from "./routeProtectors/LoginRP";
// import AccessProtect from "./routeProtectors/AccessProtect";
// import Dashboard from "./pages/admin/Dashboard";
import { AdminRoutes } from "./routes/AdminRoutes";
import Layout from "./layouts/admin/Layout";
import AccessProtect from "./routeProtectors/AccessProtect";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [loding, setLoding] = useState(true);
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    console.log(userData);

    if (userData) {
      const user = JSON.parse(userData);
      dispatch(
        login({
          isAuthenticated: true,
          user: user,
          role: user.role,
        })
      );
      setLoding(false);
    } else {
      setLoding(false);
    }
  });

  return (
    <>
      {loding ? (
        <h1>loding</h1>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <LoginRP>
                  <Login />
                </LoginRP>
              }
            />
            <Route
              path="/admin"
              element={
                <AccessProtect type="admin">
                  <Layout />
                </AccessProtect>
              }
            >
              {AdminRoutes}
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
