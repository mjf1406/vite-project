/** @format */

import { useEffect, useState } from "react";
import { db, room } from "./lib/db";
import { SignedOutView } from "./components/auth/SignedOutView";
import { Navbar } from "./components/nav/Navbar";
import { TodoHeader } from "./components/todos/TodoHeader";
import { TodoContainer } from "./components/todos/TodoContainer";
import { LoadingState } from "./components/todos/LoadingState";
import { ErrorState } from "./components/todos/ErrorState";

function App() {
    return (
        <>
            <Navbar />
            <db.SignedIn>
                <Main />
            </db.SignedIn>
            <db.SignedOut>
                <SignedOutView />
            </db.SignedOut>
        </>
    );
}

function Main() {
    const user = db.useUser();
    const [notice, setNotice] = useState<string | null>(null);
    const { isLoading, error, data } = db.useQuery({
        todos: {
            owner: {},
        },
    });
    const { peers } = db.rooms.usePresence(room);
    const numUsers = 1 + Object.keys(peers).length;

    useEffect(() => {
        if (!notice) return;
        const timer = setTimeout(() => setNotice(null), 5000);
        return () => clearTimeout(timer);
    }, [notice]);

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error.message} />;

    const todos = data?.todos || [];

    return (
        <div className="font-mono min-h-screen">
            <div className="flex justify-center items-center flex-col space-y-4 pt-8">
                <TodoHeader
                    user={user}
                    numUsers={numUsers}
                />
                <TodoContainer
                    todos={todos}
                    userId={user?.id || null}
                    notice={notice}
                    setNotice={setNotice}
                />
                <div className="text-xs text-center">
                    Open another tab to see todos update in realtime!
                </div>
            </div>
        </div>
    );
}

export default App;
