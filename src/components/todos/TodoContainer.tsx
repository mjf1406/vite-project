/** @format */

import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoActionBar } from "./TodoActionBar";
import { Notice } from "./Notice";
import type { Todo } from "../../lib/todos";

interface TodoContainerProps {
    todos: Todo[];
    userId: string | null;
    notice: string | null;
    setNotice: (notice: string | null) => void;
}

export function TodoContainer({
    todos,
    userId,
    notice,
    setNotice,
}: TodoContainerProps) {
    return (
        <div className="border border-gray-300 max-w-xs w-full">
            <TodoForm todos={todos} userId={userId} setNotice={setNotice} />
            {notice && <Notice message={notice} />}
            <TodoList todos={todos} />
            <TodoActionBar todos={todos} />
        </div>
    );
}

