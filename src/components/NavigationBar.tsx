import React from "react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function NavigationBar() {
    const auth = useAuth();
    const navigate = useNavigate();
    const user = auth?.user as User | null;

    // Get user info
    const {
        user_metadata: { full_name = "", avatar_url = "" , role = ""} = {},
        email = "",
    } = user || {};

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <nav className=" bg-background h-14 px-4  flex items-center justify-between borde">
            <div className="font-semibold text-base">
                {/* <SidebarTrigger/> */}
            </div>

            {user && (
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar  className="w-8 h-8  cursor-pointer ">
                                {avatar_url ? (
                                    <AvatarImage src={avatar_url} alt={full_name || email} />
                                ) : null}
                                <AvatarFallback  className="text-xs bg-primary text-primary-foreground  font-bold">
                                    {full_name
                                        ? getInitials(full_name)
                                        : email
                                            ? email[0].toUpperCase()
                                            : "U"}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className=" items-start border-b rounded-none mb-2 flex-col"
                            >
                                <span className="text-sm text-foreground"> {full_name || email}</span>
                                <span className="text-xs capitalize text-muted-foreground"> {role}</span>


                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handleSignOut}
                                className="text-destructive focus:text-destructive"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            )}
        </nav>
    );
}
