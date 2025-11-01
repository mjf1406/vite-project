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
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { signInWithGoogle } from "../../lib/auth";

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

    // If signed in but no profile exists, treat as guest
    if (!profile) {
        return <GuestUserCard />;
    }
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
                    <Avatar className="h-10 w-10  cursor-pointer">
                        <AvatarImage
                            src={profile?.googlePicture}
                            alt={fullName}
                        />
                        <AvatarFallback>
                            {getInitials(profile?.firstName, profile?.lastName)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
            >
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
                    <a
                        href="/settings"
                        className="cursor-pointer"
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function GuestUserCard() {
    const [nonce] = useState(() => crypto.randomUUID());

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar className="h-10 w-10 cursor-pointer">
                        <AvatarFallback className="text-xs text-white dark:text-black bg-black dark:bg-white">
                            Guest
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Guest
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            free
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <div className="cursor-pointer w-full">
                        <GoogleLogin
                            nonce={nonce}
                            onError={() => alert("Login failed")}
                            onSuccess={(credentialResponse: {
                                credential?: string;
                            }) => {
                                const credential =
                                    credentialResponse.credential;
                                if (!credential) return;
                                signInWithGoogle(credential, nonce).catch(
                                    (err) => {
                                        alert(
                                            "Uh oh: " +
                                                (err.body?.message ||
                                                    err.message)
                                        );
                                    }
                                );
                            }}
                            useOneTap={false}
                            theme="filled_black"
                            size="large"
                            text="signin_with"
                            shape="rectangular"
                        />
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
