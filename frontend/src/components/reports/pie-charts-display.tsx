// src/components/reports/pie-charts-display.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TSubjectReport, TLevelCount, Level } from "@/types/report.types";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PieChartsDisplayProps {
    isLoading: boolean;
    error: string | null;
    reportsToDisplay: TSubjectReport[];
    transformForPieChart: (counts: TLevelCount[]) => { name: string; value: number }[];
    colors: { [key in Level]: string };
}

export default function PieChartsDisplay({
    isLoading,
    error,
    reportsToDisplay,
    transformForPieChart,
    colors,
}: PieChartsDisplayProps) {
    return (
        <Card className="rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-medium">Learning Level Assessment Chart</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[300px] flex items-center justify-center">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-8">
                        <Skeleton className="h-64 w-full rounded-lg" />
                        <Skeleton className="h-64 w-full rounded-lg" />
                        <Skeleton className="h-64 w-full rounded-lg" />
                    </div>
                ) : error ? (
                    <p className="text-lg text-red-500 text-center">{error}</p>
                ) : reportsToDisplay.length === 0 ? (
                    <p className="text-lg text-gray-500 text-center">Please select subjects to draw pie charts.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {reportsToDisplay.map((report) => (
                            <Card key={report.subject} className="flex flex-col items-center p-4">
                                <CardTitle className="text-center text-lg">{report.subject === 'language2' ? '2nd Language' : report.subject.charAt(0).toUpperCase() + report.subject.slice(1)}</CardTitle>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={transformForPieChart(report.counts)}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            labelLine={false}
                                        >
                                            {transformForPieChart(report.counts).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[entry.name.toLowerCase() as Level]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}