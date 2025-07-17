import axios from "@/api/axios";
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
const PROFILE_URL = "/profile"

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.get(PROFILE_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                console.log("Aprovado");
            } catch (error) {
                localStorage.clear();
                console.log(error);
            }
        };
        verifyToken();
    }, []);
    return token ? <Outlet /> : <Navigate to={"/login"}/>
}