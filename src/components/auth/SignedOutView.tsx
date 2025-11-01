/** @format */

import { AutoGuestSignIn } from "./AutoGuestSignIn";

export function SignedOutView() {
    return (
        <>
            <AutoGuestSignIn />
            <div className="font-mono min-h-screen flex justify-center items-center">
                <div>Signing in...</div>
            </div>
        </>
    );
}
