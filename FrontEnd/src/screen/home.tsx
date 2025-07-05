import { useEffect } from "react";
import { Profile } from "./profile";

export function Home() {

    useEffect(() => {
        console.log(localStorage.getItem("accessToken"));
    })

    return (
        <>
            <h1>Olá, usuário!</h1>
            <Profile></Profile>
        </>
    )
}