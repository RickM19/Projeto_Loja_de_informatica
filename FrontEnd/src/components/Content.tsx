import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { NavBar } from "./NavBar";
import ScrollToTopButton from "./ScrollToTopButton";
import { Toaster } from "./ui/toaster";

export const Content = () => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <NavBar />

                <div className="flex-1 pl-12">
                    <SidebarTrigger className="fixed top-1/2 -m-12" />
                    <Outlet />
                    <ScrollToTopButton />
                    <Toaster />
                </div>
            </div>
        </SidebarProvider>
    );
};
