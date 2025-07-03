import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./screen/signin";
import { Home } from "./screen/home";
import { ProtectedRoutes } from "./utils/protectedRoutes";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    localStorage.clear();
  })

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<SignIn/>} path="/login"/>
          <Route element={<ProtectedRoutes/>}>
            <Route element={<Home/>} path="/"/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
