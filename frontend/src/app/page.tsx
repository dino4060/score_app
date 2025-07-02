// src/app/search/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Imports từ logic đã từng ở search-form-and-results.tsx
import { clientFetch } from "@/lib/fetch/fetch.client";
import { api } from "@/lib/api";
import { isError } from "@/lib/utils";
import { TError } from "@/types/base.types";
import { TSearchScore } from "@/types/score.types";

// Import các component con đã chia tách trước đó
import SearchForm from "@/components/search/search-form";
import SearchResultsDisplay from "@/components/search/search-results-display";

const formSchema = z.object({
    registrationNumber: z.string().regex(/^\d{7,8}$/, {
        message: "The registration number should be a 7 or 8 digit number.",
    }),
});

export default function SearchPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            registrationNumber: "",
        },
    });

    const [searchResult, setSearchResult] = useState<TSearchScore | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);
        setSearchResult(null);

        const result = await clientFetch<TSearchScore>(
            api.scores.searchScore(values.registrationNumber)
        );

        if (!isError(result))
            setSearchResult(result as TSearchScore);
        else
            setError((result as TError).message);

        setIsLoading(false);
    }

    return (
        <div className="flex flex-1 flex-col p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                {/* Search area component */}
                <SearchForm form={form} onSubmit={onSubmit} isLoading={isLoading} />

                {/* Detail Area component */}
                <SearchResultsDisplay
                    searchResult={searchResult}
                    isLoading={isLoading}
                    error={error}
                    isFormSubmitted={form.formState.isSubmitted}
                />
            </div>
        </div>
    );
}
