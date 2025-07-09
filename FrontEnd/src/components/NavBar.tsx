// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { ShoppingCart } from "lucide-react";
import { Avatar } from "./ui/avatar";

const iconSize = 32;

const links = [
    {
        name: "Produtos",
        ref: "/products",
        icon: <ShoppingCart size={iconSize} />
    }
];

export const NavBar = () => {
    return (
        <Sidebar className="h-full border-r">
            <SidebarHeader>
                <Avatar></Avatar>
            </SidebarHeader>
            <SidebarContent>
                <nav className="flex flex-col gap-4 m-4">
                    {links.map((l) => (
                        <Link
                            to={l.ref}
                            className="flex gap-4 mb-4 items-center text-md hover:bg-ring hover:text-white p-2 rounded-md"
                        >
                            {l.icon}
                            {l.name}
                        </Link>
                    ))}
                </nav>
            </SidebarContent>
        </Sidebar>
    );
};
