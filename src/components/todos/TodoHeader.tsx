/** @format */

import { GoogleSignInButton } from "../auth/GoogleSignInButton";

interface TodoHeaderProps {
    user: { isGuest: boolean } | null;
    numUsers: number;
}

export function TodoHeader({ user, numUsers }: TodoHeaderProps) {
    return (
        <>
            <div className="text-xs text-gray-500">
                Number of users online: {numUsers}
            </div>
            <h2 className="tracking-wide text-5xl text-gray-300">todos</h2>
            {user?.isGuest && (
                <div className="flex justify-center">
                    <GoogleSignInButton />
                </div>
            )}
        </>
    );
}

