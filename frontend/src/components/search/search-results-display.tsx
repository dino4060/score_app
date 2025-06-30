// src/components/search/search-results-display.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TSearchScore } from "@/types/score.types";
import ScoreDetailsRenderer from "./score-details-renderer";


interface SearchResultsDisplayProps {
    searchResult: TSearchScore | null;
    isLoading: boolean;
    error: string | null;
    isFormSubmitted: boolean;
}

export default function SearchResultsDisplay({
    searchResult,
    isLoading,
    error,
    isFormSubmitted,
}: SearchResultsDisplayProps) {
    return (
        <Card className="w-full rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-medium">
                    Show your test result
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4 py-8">
                        <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-lg text-red-500 font-medium text-center py-8">
                        {error}
                    </p>
                ) : searchResult ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 border-b pb-2">Subject scores</h4>
                                <ScoreDetailsRenderer data={searchResult.studentScore} />
                            </div>

                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                                <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 border-b pb-2">Group scores</h4>
                                <ScoreDetailsRenderer data={searchResult.groupScore} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg text-gray-500 dark:text-gray-400 text-center py-8">
                        {isFormSubmitted && searchResult === null ?
                            "Rất tiết, không tồn tại số báo dành này" :
                            "Please enter your registration number to see the result."
                        }
                    </p>
                )}
            </CardContent>
        </Card>
    );
}