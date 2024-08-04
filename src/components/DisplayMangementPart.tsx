import React from "react";

interface DisplayManagementPartProps {
    children: React.ReactNode;
    currentPage: number;
    handlePageChange: (page: number) => void;
    totalPages: number;
}

export default function DisplayManagementPart({
    children,
    currentPage,
    handlePageChange,
    totalPages,
}: DisplayManagementPartProps) {
    return (
        <div>
            {children}
            <div className="flex justify-between items-center my-10 ">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="bg-primary min-w-20 border rounded-full py-3 px-6"
                >
                    Prev
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="bg-primary min-w-20 border rounded-full py-3 px-6"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
