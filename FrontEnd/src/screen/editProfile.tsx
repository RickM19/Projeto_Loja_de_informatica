import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
const PROFILE_URL = "/profile";
const USER_URL = "/user";

interface FormTarget extends EventTarget {
    name: string 
    value: string
}

export const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    const errRef = useRef(null);
    
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

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
                setPwd(response.data.password);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    })

    const handleChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const updateAcc = async () => {

        const updatedUser = {
            name: formData.name ? formData.name : name,
            email: formData.email ? formData.email : email,
            password: formData.password ? formData.password : pwd,
        }
        try {
                await axios.put(USER_URL,
                    JSON.stringify(updatedUser),
                    {
                    headers: { 'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                        },
                    withCredentials: true
                });
                navigate("/profile");
            } catch (error: any) {
                setErrMsg(error.response.data.message);
            }
        }

    return (
        <>
            <main>
                <Card>
                    <section>
                        {errMsg &&
                            <section>
                                <Alert className="pl-6" ref={errRef} variant="destructive">
                                    <AlertCircleIcon />
                                    <AlertTitle>{errMsg}</AlertTitle>
                                </Alert>
                            </section>
                        }
                    </section>
                    <CardHeader>
                        <CardTitle>
                            Perfil
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {/* <img src="" alt="" /> */}
                        </div>
                        <div>
                                    <Label htmlFor="name">Nome</Label>
                                    <Input id="name" placeholder={name} type="text" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input id="email" placeholder={email} type="email" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="mt-4">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" placeholder={pwd} type="password" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                                <div className="mt-4">
                                    <Button className="mr-2" onClick={updateAcc}>
                                        Editar
                                    </Button>
                                    <Link to="/profile">
                                        <Button variant="destructive">
                                            Cancelar
                                        </Button>
                                    </Link>
                                </div>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}