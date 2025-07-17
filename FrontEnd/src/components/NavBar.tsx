// import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import {
    House,
    ShoppingBasket,
    ShoppingCart,
    SquareArrowOutUpLeft,
    UserRoundPlus
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useContext, useEffect } from "react";
import { UserContext } from "@/Contexts/UserContext";
import axios from "@/api/axios";
import { Button } from "./ui/button";

const PROFILE_URL = "/profile";
const ICON_SIZE = 32;

const links = [
    {
        name: "Início",
        ref: "/",
        icon: <House size={ICON_SIZE} />
    },
    {
        name: "Produtos",
        ref: "/products",
        icon: <ShoppingBasket size={ICON_SIZE} />
    },
    {
        name: "Pedidos",
        ref: "/orders",
        icon: <ShoppingCart size={ICON_SIZE} />
    },
    {
        name: "Clientes",
        ref: "/customers",
        icon: <UserRoundPlus size={ICON_SIZE} />
    }
];
const defaultUser = {
    id: "",
    name: "",
    email: ""
};
export const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const name = user?.name;
    const splited = name?.toUpperCase().split(" ");
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(PROFILE_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                const { email, name, id } = response.data;
                const userObject = {
                    id,
                    name,
                    email
                };
                setUser(userObject);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    });

    const logOut = () => {
        localStorage.clear();
        setUser(defaultUser);
        navigate("/login");
    };

    return (
        <Sidebar className="h-full border-r">
            <SidebarHeader className="flex items-center mt-4 flex-col gap-4">
                <Link to={"/profile"}>
                    <Avatar className="bg-primary border-2 h-15 w-15">
                        <AvatarImage src="../assets/"></AvatarImage>
                        <AvatarFallback>
                            {splited
                                ? `${splited[0][0]}${
                                      splited[splited.length - 1][0]
                                  }`
                                : null}
                        </AvatarFallback>
                    </Avatar>
                </Link>

                <span className="text-sm font-bold">
                    {splited && `${splited[0]} `}
                    {splited![1] && splited![1]}
                </span>
            </SidebarHeader>
            <SidebarContent>
                <nav className="flex flex-col gap-4 m-4">
                    {links.map((l, index) => (
                        <Link
                            key={index}
                            to={l.ref}
                            className="flex gap-4 mb-4 items-center text-md hover:bg-ring hover:text-white transition duration-300 p-2 rounded-md border-b-2"
                        >
                            {l.icon}
                            {l.name}
                        </Link>
                    ))}
                    <Button className="mr-2" variant="ghost" onClick={logOut}>
                        <SquareArrowOutUpLeft />
                        Sair
                    </Button>
                </nav>
            </SidebarContent>
        </Sidebar>
    );
};
