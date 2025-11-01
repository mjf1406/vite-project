/** @format */

import { deleteCompleted } from "../../lib/todos";
import type { Todo } from "../../lib/todos";

interface TodoActionBarProps {
    todos: Todo[];
}

export function TodoActionBar({ todos }: TodoActionBarProps) {
    const remaining = todos.filter((todo) => !todo.done).length;

    return (
        <div className="flex justify-between items-center h-10 px-2 text-xs border-t border-gray-300">
            <div>Remaining todos: {remaining}</div>
            <button
                className="text-gray-300 hover:text-gray-500"
                onClick={() => deleteCompleted(todos)}
            >
                Delete Completed
            </button>
        </div>
    );
}

