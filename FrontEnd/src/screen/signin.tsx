import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import devicesImg from "../assets/Devices-bro.svg";
import hardDriveImg from "../assets/Hard-drive-bro.svg";
import smartHomeImg from "../assets/Smart-home-bro.svg";
import { useEffect, useRef, useState, type FormEvent } from "react";
import axios from "@/api/axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import * as axiosPkg from "axios";
import type FormTarget from "@/utils/formTarget";
const LOGIN_URL = "/login";

export function SignIn() {
    const navigate = useNavigate();
    const errRef = useRef(null);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    const handleChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            console.log("response: " + JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            localStorage.setItem("accessToken", accessToken);
            navigate("/");
            window.location.reload();
        } catch (error: unknown) {
            if (axiosPkg.isAxiosError(error)) {
                setErrMsg(error.response?.data.message || "Erro desconhecido");
                console.log(error.response?.data);
            } else {
                setErrMsg("Erro inesperado");
                console.error(error);
            }
        }
    };

    return (
        <>
            <main className="h-screen flex w-full">
                <div className="bg-primary-foreground w-full h-full flex items-center justify-center p-16">
                    <Carousel className="w-full max-w-xl">
                        <CarouselContent>
                            <CarouselItem>
                                <a
                                    href="https://storyset.com/technology"
                                    target="_blank"
                                >
                                    <div className="flex aspect-square bg-background rounded p-8">
                                        <img
                                            src={devicesImg}
                                            alt="Dispositivos eletrônicos"
                                        />
                                    </div>
                                </a>
                            </CarouselItem>
                            <CarouselItem>
                                <a
                                    href="https://storyset.com/technology"
                                    target="_blank"
                                >
                                    <div className="flex aspect-square bg-background rounded p-8">
                                        <img
                                            src={hardDriveImg}
                                            alt="Disco rígido"
                                        />
                                    </div>
                                </a>
                            </CarouselItem>
                            <CarouselItem>
                                <a
                                    href="https://storyset.com/technology"
                                    target="_blank"
                                >
                                    <div className="flex aspect-square bg-background rounded p-8">
                                        <img
                                            src={smartHomeImg}
                                            alt="Casa inteligente"
                                        />
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
                        {errMsg && (
                            <section>
                                <Alert ref={errRef} variant="destructive">
                                    <AlertCircleIcon />
                                    <AlertTitle>{errMsg}</AlertTitle>
                                </Alert>
                            </section>
                        )}
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold tracking-tighter">
                                Entre com sua conta
                            </CardTitle>
                            <CardDescription>
                                Utilize seu e-mail e senha para entrar.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    placeholder="exemplo@email.com"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    placeholder="sua senha"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                className="mt-6 w-full"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Entrar
                            </Button>
                            <p className="mt-1 text-muted-foreground">
                                <Link to="/signup">
                                    Não possui uma conta? Registre-se
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    );
}
