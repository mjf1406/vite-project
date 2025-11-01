/** @format */

interface NoticeProps {
    message: string;
}

export function Notice({ message }: NoticeProps) {
    return (
        <div className="divide-y divide-gray-300">
            <div className="flex items-center h-10 bg-red-500 text-white">
                <div className="h-full px-2 flex items-center justify-center">
                    <div className="w-5 h-5 flex items-center justify-center" />
                </div>
                <div className="flex-1 px-2 overflow-hidden flex items-center">
                    <span className="font-medium">{message}</span>
                </div>
                <div className="h-full px-2 flex items-center justify-center" />
            </div>
        </div>
    );
}

