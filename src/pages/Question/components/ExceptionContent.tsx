import { ReactNode } from "react";

interface ExceptionContentProps {
    children: ReactNode
}

function ExceptionContent({ children }: ExceptionContentProps) {
    return (
        <p className="bg-red-800 p-2 rounded-md">{children}</p>
    )
}

export default ExceptionContent;