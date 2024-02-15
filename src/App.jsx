import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Menu } from "./components/Menu";
import { Error404 } from "./pages/Error404";
import Login from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import { RequestResetPassword } from "./pages/RequestResetPassword";
import ResetPasswordForm from "./pages/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Menu></Menu>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<Signup></Signup>}></Route>
            <Route
              path="/reset"
              element={<RequestResetPassword></RequestResetPassword>}
            ></Route>
            <Route
              path="/change_password/:uidb64/:token"
              element={<ResetPasswordForm></ResetPasswordForm>}
            ></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/*" element={<Error404></Error404>}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
