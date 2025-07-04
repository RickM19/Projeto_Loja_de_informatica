import axios from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
const PROFILE_URL = "/profile";

export const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const token = localStorage.getItem('accessToken');

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
        </main>
    )
}