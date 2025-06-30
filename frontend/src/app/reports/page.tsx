// app/reports/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TSubject, TotalReport, TSubjectReport, TLevelCount, Level } from "@/types/report.types";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { clientFetch } from "@/lib/fetch/fetch.client";
import { api } from "@/lib/api";

// Định nghĩa tất cả các môn học có thể có
const ALL_SUBJECTS: TSubject[] = [
    'math', 'literature', 'language2',
    'physics', 'chemistry', 'biology',
    'history', 'geography', 'civics'
];

// Định nghĩa màu sắc cho các cấp độ trong Pie Chart
const COLORS: { [key in Level]: string } = {
    'good': '#4CAF50',    // Green
    'fair': '#FFC107',    // Amber
    'standard': '#2196F3', // Blue
    'bad': '#F44336'      // Red
};

export default function ReportsPage() {
    // State để quản lý các môn học được chọn
    const [selectedSubjects, setSelectedSubjects] = useState<TSubject[]>(ALL_SUBJECTS);
    const [isAllSelected, setIsAllSelected] = useState(true);

    // State cho dữ liệu báo cáo được fetch từ API
    const [reportData, setReportData] = useState<TotalReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // useEffect để fetch dữ liệu khi selectedSubjects thay đổi
    useEffect(() => {
        const fetchReports = async () => {
            if (selectedSubjects.length === 0) return;

            setIsLoading(true);
            setError(null);
            setReportData(null);

            const subjectsToFetch = selectedSubjects.map(subject => ({ subject }));

            const result = await clientFetch<TotalReport>(
                api.reports.reportSubjects(subjectsToFetch)
            );

            setReportData(result as TotalReport);

            setIsLoading(false);
        };

        fetchReports();
    }, [selectedSubjects, isAllSelected]);

    // Xử lý thay đổi checkbox "All"
    const handleSelectAll = (checked: boolean) => {
        setIsAllSelected(checked);
        if (checked) {
            setSelectedSubjects(ALL_SUBJECTS);
        } else {
            setSelectedSubjects([]);
        }
    };

    // Xử lý thay đổi checkbox từng môn học
    const handleSubjectChange = (subject: TSubject, checked: boolean) => {
        if (checked) {
            setSelectedSubjects(prev => [...prev, subject]);
        } else {
            setSelectedSubjects(prev => prev.filter(s => s !== subject));
            setIsAllSelected(false);
        }
    };

    // Chuẩn bị dữ liệu cho Pie Chart từ TLevelCount
    const transformForPieChart = (counts: TLevelCount[]) => {
        return counts.map(item => ({
            name: item.level.charAt(0).toUpperCase() + item.level.slice(1), // Capitalize level name
            value: item.count
        }));
    };

    // Lọc các báo cáo để hiển thị
    const reportsToDisplay = useMemo(() => {
        if (!reportData || !reportData.reports) return [];
        if (isAllSelected) {
            return reportData.reports;
        }
        return reportData.reports.filter(report => selectedSubjects.includes(report.subject));
    }, [reportData, selectedSubjects, isAllSelected]);


    return (
        <div className="flex flex-1 flex-col p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">

                {/* Hàng các Checkbox chọn môn học */}
                <Card className="rounded-lg shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-medium">Chọn môn học</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex items-center space-x-2 mr-4">
                                <Checkbox
                                    id="all-subjects"
                                    checked={isAllSelected}
                                    onCheckedChange={handleSelectAll}
                                />
                                <label
                                    htmlFor="all-subjects"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    All Subjects
                                </label>
                            </div>
                            {ALL_SUBJECTS.map((subject) => (
                                <div key={subject} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={subject}
                                        checked={selectedSubjects.includes(subject)}
                                        onCheckedChange={(checked) => handleSubjectChange(subject, Boolean(checked))}
                                        disabled={isAllSelected}
                                    />
                                    <label
                                        htmlFor={subject}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {subject === 'language2' ? '2nd Language' : subject.charAt(0).toUpperCase() + subject.slice(1)}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Phần hiển thị Pie Charts */}
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
                                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as Level]} />
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

            </div>
        </div>
    );
}