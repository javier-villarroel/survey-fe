import React from 'react';
import { Skeleton } from 'primereact/skeleton';

export const LoadingSkeleton: React.FC = () => {
    return (
        <div className="w-full">
            {/* Header skeleton */}
            <div className="flex justify-between mb-4">
                <Skeleton width="15rem" height="2rem" />
                <Skeleton width="10rem" height="2.5rem" className="mr-2" />
            </div>

            {/* Table header skeleton */}
            <div className="flex gap-3 mb-3">
                {Array(5).fill(0).map((_, index) => (
                    <Skeleton key={`header-${index}`} width="15rem" height="3rem" />
                ))}
            </div>

            {/* Table rows skeleton */}
            {Array(5).fill(0).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="flex gap-3 mb-3">
                    {Array(5).fill(0).map((_, colIndex) => (
                        <Skeleton key={`cell-${rowIndex}-${colIndex}`} width="15rem" height="3rem" />
                    ))}
                </div>
            ))}

            {/* Pagination skeleton */}
            <div className="flex justify-content-between align-items-center mt-4">
                <Skeleton width="10rem" height="2.5rem" />
                <div className="flex gap-2">
                    {Array(5).fill(0).map((_, index) => (
                        <Skeleton key={`page-${index}`} width="3rem" height="2.5rem" />
                    ))}
                </div>
            </div>
        </div>
    );
}; 