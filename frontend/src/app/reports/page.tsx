// src/app/reports/page.tsx
"use client";

import PieChartsDisplay from "@/components/reports/pie-charts-display";
import SubjectCheckboxes from "@/components/reports/subject-checkboxes";
import { api } from "@/lib/api";
import { clientFetch } from "@/lib/fetch/fetch.client";
import { Level, TLevelCount, TSubject, TotalReport } from "@/types/report.types";
import { useEffect, useMemo, useState } from "react";

const ALL_SUBJECTS: TSubject[] = [
    'math', 'literature', 'language2',
    'physics', 'chemistry', 'biology',
    'history', 'geography', 'civics'
];

const COLORS: { [key in Level]: string } = {
    'good': '#4CAF50',
    'fair': '#FFC107',
    'standard': '#2196F3',
    'bad': '#F44336'
};

export default function ReportsPage() {
    const [selectedSubjects, setSelectedSubjects] = useState<TSubject[]>(ALL_SUBJECTS);
    const [isAllSelected, setIsAllSelected] = useState(true);

    const [reportData, setReportData] = useState<TotalReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleSelectAll = (checked: boolean) => {
        setIsAllSelected(checked);
        if (checked) {
            setSelectedSubjects(ALL_SUBJECTS);
        } else {
            setSelectedSubjects([]);
        }
    };

    const handleSubjectChange = (subject: TSubject, checked: boolean) => {
        if (checked) {
            setSelectedSubjects(prev => [...prev, subject]);
        } else {
            setSelectedSubjects(prev => prev.filter(s => s !== subject));
            setIsAllSelected(false);
        }
    };

    const transformForPieChart = (counts: TLevelCount[]) => {
        return counts.map(item => ({
            name: item.level.charAt(0).toUpperCase() + item.level.slice(1),
            value: item.count
        }));
    };

    const reportsToDisplay = useMemo(() => {
        if (!reportData || !reportData.reports) return [];
        if (isAllSelected) {
            return reportData.reports;
        }
        return reportData.reports.filter(report => selectedSubjects.includes(report.subject));
    }, [reportData, selectedSubjects, isAllSelected]);

    return (
        <div className="flex flex-1 flex-col p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">

                {/* Component cho khu vực chọn môn học */}
                <SubjectCheckboxes
                    allSubjects={ALL_SUBJECTS}
                    selectedSubjects={selectedSubjects}
                    isAllSelected={isAllSelected}
                    onSelectAll={handleSelectAll}
                    onSubjectChange={handleSubjectChange}
                />

                {/* Component cho khu vực biểu đồ Pie */}
                <PieChartsDisplay
                    isLoading={isLoading}
                    error={error}
                    reportsToDisplay={reportsToDisplay}
                    transformForPieChart={transformForPieChart}
                    colors={COLORS}
                />

            </div>
        </div>
    );
}