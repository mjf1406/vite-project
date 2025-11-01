/** @format */

import { db } from "../../lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Settings, LogOut } from "lucide-react";

function getInitials(firstName?: string, lastName?: string) {
    const f = (firstName || "").trim();
    const l = (lastName || "").trim();
    if (!f && !l) return "?";
    return `${f[0] || ""}${l[0] || ""}`.toUpperCase();
}

export function UserCard() {
    return (
        <>
            <db.SignedIn>
                <SignedInUserCard />
            </db.SignedIn>
            <db.SignedOut>
                <GuestUserCard />
            </db.SignedOut>
        </>
    );
}

function SignedInUserCard() {
    const user = db.useUser();
    const { data } = db.useQuery({
        profiles: {
            $: { where: { "user.id": user.id } },
        },
    });

    const profile = data?.profiles?.[0];
    const fullName = [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ");

    const handleLogout = () => {
        db.auth.signOut().catch((err) => {
            console.error("Failed to sign out:", err);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.googlePicture} alt={fullName} />
                        <AvatarFallback>
                            {getInitials(profile?.firstName, profile?.lastName)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {fullName || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {profile?.plan || "free"}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <a href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function GuestUserCard() {
    return (
        <div className="flex items-center gap-3">
            <Avatar>
                <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-sm font-medium">Guest</span>
                <span className="text-xs text-gray-500">free</span>
            </div>
        </div>
    );
}
