import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
    const user = localStorage.getItem("accessToken");
    return user ? <Outlet /> : <Navigate to={"/login"}/>
}