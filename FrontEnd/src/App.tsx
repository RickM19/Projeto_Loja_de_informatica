import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./screen/signin";
import { Home } from "./screen/home";
import { ProtectedRoutes } from "./utils/protectedRoutes";
import { Profile } from "./screen/profile";
import { SignUp } from "./screen/signup";

export function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<SignIn/>} path="/login"/>
          <Route element={<SignUp/>} path="/signup"/>
          <Route element={<ProtectedRoutes/>}>
            <Route element={<Home/>} path="/"/>
            <Route element={<Profile/>} path="/profile"/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
