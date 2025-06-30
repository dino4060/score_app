// app/search/page.tsx

// export default function ReportsPage() {
//     return (
//         <div className="flex flex-1 flex-col">
//             <div className="@container/main flex flex-1 flex-col gap-2">
//                 <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//                     <p className="px-4 lg:px-6">
//                         The search feature is being implemented
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Định nghĩa schema validation với Zod
const formSchema = z.object({
    registrationNumber: z.string().regex(/^\d{7}$/, {
        message: "The registration number should be a 7 digit number.",
    }),
});

export default function SearchPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            registrationNumber: "",
        },
    });

    const [showDetails, setShowDetails] = useState(false);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Search a registrationNumber:", values.registrationNumber);
        setShowDetails(true);
    }

    return (
        <div className="flex flex-1 flex-col p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">

                {/* Phần "Tìm kiếm điểm số" */}
                <Card className="w-full rounded-xl shadow-lg">
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100">
                            Tra cứu điểm số
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="registrationNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-lg font-medium text-gray-800 dark:text-gray-200">
                                                Số đăng ký:
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="VD: 1234567"
                                                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 transition-all duration-200"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 text-sm mt-1" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 ease-in-out transform hover:scale-105"
                                >
                                    Tìm kiếm
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* Phần "Điểm số chi tiết" */}
                <Card className="w-full rounded-xl shadow-lg">
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                            Kết quả chi tiết
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Hiển thị điểm số chi tiết của học sinh.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {showDetails ? (
                            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium text-center py-8">
                                Tính năng xem chi tiết đang được triển khai.
                            </p>
                        ) : (
                            <p className="text-lg text-gray-500 dark:text-gray-400 text-center py-8">
                                Vui lòng nhập số đăng ký và nhấn "Tìm kiếm" để xem kết quả.
                            </p>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
