// import { useEffect } from "react";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";

export const NavBar = () => {
    return (
        <Sidebar className="h-full border-r bg-white">
            <SidebarHeader>
                <h2 className="text-lg font-semibold px-4 py-2">Titulo</h2>
            </SidebarHeader>
            <SidebarContent>Links</SidebarContent>
        </Sidebar>
    );
};
