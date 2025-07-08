import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from "./screen/signin";
import { Home } from "./screen/home";
import { ProtectedRoutes } from "./utils/protectedRoutes";
import { Profile } from "./screen/profile";
import { SignUp } from "./screen/signup";
import { EditProfile } from "./screen/editProfile";
import { Products } from "./screen/products";
import { Content } from "./components/Content";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SignIn />} path="/login" />
                <Route element={<SignUp />} path="/signup" />
                <Route element={<ProtectedRoutes />}>
                    <Route element={<Content />}>
                        <Route element={<Home />} path="/" />
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Products />} path="/products" />
                        <Route element={<EditProfile />} path="/profile/edit" />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
