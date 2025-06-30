// src/components/search/score-details-renderer.tsx
"use client";

import { TScore, TGroupScore } from "@/types/score.types";

interface ScoreDetailsRendererProps {
    data: TScore | TGroupScore | null;
}

export default function ScoreDetailsRenderer({ data }: ScoreDetailsRendererProps) {
    if (!data) return null;

    const keys = Object.keys(data) as Array<keyof (TScore | TGroupScore)>;

    const excludeKeys = ['id', 'registrationNumber'];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {keys.map((key) => {
                if (excludeKeys.includes(String(key))) return null;

                const value = data[key];

                if (value !== null && value !== undefined) {
                    const displayKey = String(key)
                        .replace(/language2/g,
                            '2nd Language')
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/_/g, ' ')
                        .split(' ')
                        .map(word =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1))
                        .join(' ');

                    return (
                        <div key={String(key)} className="flex justify-between items-center py-1 border-b border-dashed border-gray-200 dark:border-gray-700">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{displayKey}</span>
                            <span className="text-gray-900 dark:text-gray-100 font-bold">{value}</span>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
}