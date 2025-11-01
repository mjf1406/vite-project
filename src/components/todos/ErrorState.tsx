/** @format */

interface ErrorStateProps {
    message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
    return (
        <div className="text-red-500 p-4">
            Error: {message}
            <br />
            <small>Check console for more details</small>
        </div>
    );
}

