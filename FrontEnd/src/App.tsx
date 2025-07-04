import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./screen/signin";
import { Home } from "./screen/home";
import { ProtectedRoutes } from "./utils/protectedRoutes";
import { useEffect } from "react";
import { Profile } from "./screen/profile";

export function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<SignIn/>} path="/login"/>
          <Route element={<ProtectedRoutes/>}>
            <Route element={<Home/>} path="/"/>
            <Route element={<Profile/>} path="/profile"/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
