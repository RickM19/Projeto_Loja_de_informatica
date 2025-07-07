import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SquareArrowOutUpLeft, SquarePen, Trash2 } from "lucide-react";
const PROFILE_URL = "/profile";
const USER_URL = "/user";

export const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(PROFILE_URL, {
                    headers: { 'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                     },
                    withCredentials: true
                });
                setEmail(response.data.email);
                setName(response.data.name);
                setId(response.data.id);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    })

    const logOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    const deleteAcc = async () => {
        try {
                await axios.delete(USER_URL + "/" + id, {
                    headers: { 'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                     },
                    withCredentials: true
                });
            } catch (error) {
                console.log(error);
            }
        navigate("/login");
    }

    return (
        <main>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Perfil
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        {/* <img src="" alt="" /> */}
                    </div>
                    <p className="font-bold">{name}</p>
                    <p>{email}</p>
                    <div className="mt-4">
                        <Button className="mr-2" variant="ghost" onClick={logOut}><SquareArrowOutUpLeft />Sair</Button>
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
    )
}