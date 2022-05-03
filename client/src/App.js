import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";

import { login } from "./store/actions/user.action";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/nav/Header";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import PublicRoute from "./components/publicRoute/PublicRoute";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        dispatch(
          login({
            email: user.email,
            token: idTokenResult.token,
          })
        );
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/register/complete"
            element={<RegisterComplete />}
          />
          <Route exact path="/forgot/password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
