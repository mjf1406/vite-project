/** @format */

import { UserCard } from "../user/UserCard";
import { ThemeToggle } from "../ui/theme-toggle";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="max-w-6xl mx-auto">
                <div className="flex h-16 items-center justify-between px-4">
                    {/* Left: App Name */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/charactermancer-logo.svg"
                            alt="Charactermancer Logo"
                            className="h-12 w-12"
                        />
                        <h1 className="text-xl font-bold">Charactermancer</h1>
                    </div>

                    {/* Center: Navigation Links (placeholder for future links) */}
                    <div className="flex items-center gap-6">
                        {/* Add nav links here in the future */}
                    </div>

                    {/* Right: Theme Toggle + User Card */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <UserCard />
                    </div>
                </div>
            </div>
        </nav>
    );
}
