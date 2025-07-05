import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const PROFILE_URL = "/profile";

export const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
                    <p>{name}</p>
                    <p>{email}</p>
                </CardContent>
            </Card>
            <Button variant="destructive" onClick={logOut}>Logout</Button>
        </main>
    )
}