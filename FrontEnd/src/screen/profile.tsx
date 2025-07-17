import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SquareArrowOutUpLeft, SquarePen, Trash2 } from "lucide-react";
import { UserContext } from "@/Contexts/UserContext";

const USER_URL = "/user";
const defaultUser = {
    id: "",
    name: "",
    email: ""
};
export const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        setUser(defaultUser);
        navigate("/login");
    };

    const deleteAcc = async () => {
        try {
            await axios.delete(USER_URL + "/" + user?.id, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setUser(defaultUser);
        } catch (error) {
            console.log(error);
        }
        navigate("/login");
    };

    return (
        <main>
            <Card>
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>{/* <img src="" alt="" /> */}</div>
                    <p className="font-bold">{user?.name}</p>
                    <p>{user?.email}</p>
                    <div className="mt-4">
                        <Button
                            className="mr-2"
                            variant="ghost"
                            onClick={logOut}
                        >
                            <SquareArrowOutUpLeft />
                            Sair
                        </Button>
                        <Link to="/profile/edit">
                            <Button variant="outline" className="mr-2">
                                <SquarePen />
                                Editar
                            </Button>
                        </Link>
                        <Button variant="destructive" onClick={deleteAcc}>
                            <Trash2 />
                            Excluir
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
};
