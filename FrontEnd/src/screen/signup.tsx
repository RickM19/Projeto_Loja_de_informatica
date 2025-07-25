import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import devicesImg from "../assets/Devices-bro.svg";
import hardDriveImg from "../assets/Hard-drive-bro.svg";
import smartHomeImg from "../assets/Smart-home-bro.svg"
import { useEffect, useRef, useState, type FormEvent } from "react";
import axios from "@/api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react";
import type FormTarget from "@/utils/formTarget";
const SIGNUP_URL = "/user";

export function SignUp() {

    const navigate = useNavigate();
    const errRef = useRef(null);
 
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [formData]);

    const handleChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({name: formData.name, email: formData.email, password: formData.password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            navigate('/login');
        } catch (err: any) {
            setErrMsg(err.response.data.message);
        }
    }

    return (
        <>
            <main className="h-screen flex w-full">
                <div className="bg-primary-foreground w-full h-full flex items-center justify-center p-16">
                    <Carousel className="w-full max-w-xl">
                        <CarouselContent>
                            <CarouselItem>
                                <a href="https://storyset.com/technology" target="_blank">
                                    <div className="flex aspect-square bg-background rounded p-8">
                                        <img src={devicesImg} alt="Dispositivos eletrônicos" />
                                    </div>
                                </a>
                            </CarouselItem>
                            <CarouselItem>
                                <a href="https://storyset.com/technology" target="_blank">
                                    <div className="flex aspect-square bg-background rounded p-8">
                                        <img src={hardDriveImg} alt="Disco rígido" />
                                    </div>
                                </a>
                            </CarouselItem>
                            <CarouselItem>
                                <a href="https://storyset.com/technology" target="_blank">
                                    <div className="flex aspect-square bg-background rounded p-8">
                                        <img src={smartHomeImg} alt="Casa inteligente" />
                                    </div>
                                </a>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
                    <Card className="w-full max-w-md">
                        {errMsg &&
                            <section>
                                <Alert ref={errRef} variant="destructive">
                                    <AlertCircleIcon />
                                    <AlertTitle>{errMsg}</AlertTitle>
                                </Alert>
                            </section>
                        }
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold tracking-tighter">
                                Crie sua conta
                            </CardTitle>
                            <CardDescription>
                                Utilize seu e-mail e senha para registrar-se.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" placeholder="Seu Nome" type="text" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="email">E-mail</Label>
                                <Input id="email" placeholder="exemplo@email.com" type="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password" placeholder="sua senha" type="password" name="password" value={formData.password} onChange={handleChange} />
                            </div>
                            <Button className="mt-6 w-full" type="submit" onClick={handleSubmit}>Cadastrar</Button>
                            <p className="mt-1 text-muted-foreground"><Link to='/login'>Já possui uma conta? Entre</Link></p>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    )
}