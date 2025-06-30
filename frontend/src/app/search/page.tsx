// // app/search/page.tsx
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { TScore, TGroupScore, TSearchScore } from "@/types/score.types";
// import { clientFetch } from "@/lib/fetch/fetch.client";
// import { api } from "@/lib/api";
// import { isError } from "@/lib/utils";
// import { TError } from "@/types/base.types";

// const formSchema = z.object({
//     registrationNumber: z.string().regex(/^\d{7}|\d{8}$/, {
//         message: "The registration number should be a 7 or 8 digit number.",
//     }),
// });
// export default function SearchPage() {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             registrationNumber: "",
//         },
//     });

//     const [searchResult, setSearchResult] = useState<TSearchScore | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     // onSubmit function to call Api
//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         setIsLoading(true);
//         setError(null);
//         setSearchResult(null);

//         const result = await clientFetch<TSearchScore>(
//             api.scores.searchScore(values.registrationNumber)
//         );

//         if (!isError(result))
//             setSearchResult(result as TSearchScore);
//         else
//             setError((result as TError).message);


//         setIsLoading(false);
//     }

//     // renderScoreDetails only render non-nullish values
//     const renderScoreDetails = (data: TScore | TGroupScore) => {
//         if (!data) return null;

//         const keys = Object.keys(data) as Array<keyof (TScore | TGroupScore)>;

//         const excludeKeys = ['id', 'registrationNumber'];

//         return (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
//                 {keys.map((key) => {
//                     if (excludeKeys.includes(String(key))) return null;

//                     const value = data[key];

//                     if (value !== null && value !== undefined) {
//                         const displayKey = String(key)
//                             .replace(/language2/g,
//                                 '2nd Language')           // replace 'language2' with '2nd Language'
//                             .replace(/([A-Z])/g, ' $1')   // insert space before CamelCase letters
//                             .replace(/_/g, ' ')           // instead of underscores
//                             .split(' ')                   // split into words
//                             .map(word =>
//                                 word.charAt(0).toUpperCase() +
//                                 word.slice(1))            // uppercase first letter
//                             .join(' ');                   // join to string

//                         return (
//                             <div key={String(key)} className="flex justify-between items-center py-1 border-b border-dashed border-gray-200 dark:border-gray-700">
//                                 <span className="font-medium text-gray-700 dark:text-gray-300">{displayKey}</span>
//                                 <span className="text-gray-900 dark:text-gray-100 font-bold">{value}</span>
//                             </div>
//                         );
//                     }
//                     return null;
//                 })}
//             </div>
//         );
//     };

//     return (
//         <div className="flex flex-1 flex-col p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
//             <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">

//                 {/* Search area */}
//                 <Card className="w-full rounded-lg shadow-lg">
//                     <CardHeader>
//                         <CardTitle className="text-xl font-medium">
//                             Search your test result
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)}
//                                 className="space-y-4"
//                             >
//                                 <FormField
//                                     control={form.control}
//                                     name="registrationNumber"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>
//                                                 Registration number
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     placeholder="Enter your registration number"
//                                                     className="w-full text-center"
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <Button
//                                     type="submit"
//                                     className="w-full bg-primary hover:bg-primary/90 text-white"
//                                     disabled={isLoading}
//                                 >
//                                     {isLoading ? "Searching ..." : "Search"}
//                                 </Button>
//                             </form>
//                         </Form>
//                     </CardContent>
//                 </Card>

//                 {/* Detail Area */}
//                 <Card className="w-full rounded-lg shadow-lg">
//                     <CardHeader>
//                         <CardTitle className="text-xl font-medium">
//                             Show your test result
//                         </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         {isLoading ? (
//                             // render Skeleton when fetching data
//                             <div className="space-y-4 py-8">
//                                 <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <Skeleton className="h-6 w-full" />
//                                     <Skeleton className="h-6 w-full" />
//                                     <Skeleton className="h-6 w-full" />
//                                     <Skeleton className="h-6 w-full" />
//                                     <Skeleton className="h-6 w-full" />
//                                     <Skeleton className="h-6 w-full" />
//                                 </div>
//                             </div>
//                         ) : error ? (
//                             // render Error when there is an error
//                             <p className="text-lg text-red-500 font-medium text-center py-8">
//                                 {error}
//                             </p>
//                         ) : searchResult ? (
//                             // render result
//                             <div className="space-y-6">
//                                 {/* <h3 className="text-2xl font-semibold text-center text-[var(--dino-rose)]">
//                                     Registration number: {searchResult.studentScore?.registrationNumber}
//                                 </h3> */}

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {/* render subject scores */}
//                                     <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
//                                         <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 border-b pb-2">Subject scores</h4>
//                                         {renderScoreDetails(searchResult.studentScore)}
//                                     </div>

//                                     {/* render group scores */}
//                                     <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
//                                         <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 border-b pb-2">Group scores</h4>
//                                         {renderScoreDetails(searchResult.groupScore)}
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             // render initial notice
//                             <p className="text-lg text-gray-500 dark:text-gray-400 text-center py-8">
//                                 Please enter your registration number to see the result.
//                             </p>
//                         )}
//                     </CardContent>
//                 </Card>

//             </div>
//         </div>
//     );
// }

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
    registrationNumber: z.string().regex(/^\d{7}|\d{8}$/, {
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
