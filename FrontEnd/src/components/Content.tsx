import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { NavBar } from "./NavBar";

export const Content = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <NavBar />
                <div className="flex-1 overflow-y-auto relative">
                    <SidebarTrigger className="absolute left-0 top-1/2" />
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    );
};
