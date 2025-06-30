// src/components/search/search-form.tsx
"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Định nghĩa lại formSchema local cho component này nếu cần validation độc lập,
// hoặc import từ file cha nếu schema là chung và không thay đổi.
// Hiện tại, tôi sẽ dùng một schema tạm thời để code chạy được.
// Trong thực tế, bạn nên import formSchema từ file gốc nếu nó là chung.
const localFormSchema = z.object({
    registrationNumber: z.string().regex(/^\d{7}|\d{8}$/, {
        message: "The registration number should be a 7 or 8 digit number.",
    }),
});

interface SearchFormProps {
    form: UseFormReturn<z.infer<typeof localFormSchema>>;
    onSubmit: (values: z.infer<typeof localFormSchema>) => void;
    isLoading: boolean;
}

export default function SearchForm({ form, onSubmit, isLoading }: SearchFormProps) {
    return (
        <Card className="w-full rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-medium">
                    Search your test result
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="registrationNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Registration number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your registration number"
                                            className="w-full text-center"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? "Searching ..." : "Search"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}