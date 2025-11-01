/** @format */

import { ChevronDownIcon } from "../ui/ChevronDownIcon";
import { toggleAll, addTodo } from "../../lib/todos";
import type { Todo } from "../../lib/todos";

interface TodoFormProps {
    todos: Todo[];
    userId: string | null;
    setNotice: (notice: string | null) => void;
}

export function TodoForm({ todos, userId, setNotice }: TodoFormProps) {
    return (
        <div className="flex items-center h-10 border-b border-gray-300">
            <button
                className="h-full px-2 border-r border-gray-300 flex items-center justify-center"
                onClick={() => toggleAll(todos)}
            >
                <div className="w-5 h-5">
                    <ChevronDownIcon />
                </div>
            </button>
            <form
                className="flex-1 h-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!userId) return;
                    const input = e.currentTarget.input as HTMLInputElement;
                    addTodo(input.value, userId, todos, setNotice);
                    input.value = "";
                }}
            >
                <input
                    className="w-full h-full px-2 outline-none bg-transparent"
                    autoFocus
                    placeholder="What needs to be done?"
                    type="text"
                    name="input"
                />
            </form>
        </div>
    );
}

