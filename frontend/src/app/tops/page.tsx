// app/tops/page.tsx
"use client";

import { DataTable } from "@/components/data-table";
import { api } from "@/lib/api";
import { clientFetch } from "@/lib/fetch/fetch.client";
import { TGroup, TGroupQuery, TSubject } from "@/types/report.types";
import { TScoreByGroup } from "@/types/score.types";
import { useEffect, useState } from "react";

// Định nghĩa các khối (groups) đầy đủ, đã được cung cấp
export const fullGroups: { name: TGroup, subjects: TSubject[], language2Type?: string }[] = [
    { name: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    { name: 'A01', subjects: ['math', 'physics', 'language2'], language2Type: 'N1' },
    { name: 'A02', subjects: ['math', 'physics', 'biology'] },
    { name: 'B00', subjects: ['math', 'biology', 'chemistry'] },
    { name: 'C00', subjects: ['literature', 'history', 'geography'] },
    { name: 'D00', subjects: ['literature', 'math', 'language2'], language2Type: 'N1' },
];

export default function TopsPage() {

    const [selectedGroup, setSelectedGroup] = useState<TGroup>('A00');
    const [tableData, setTableData] = useState<TScoreByGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect để gọi API khi selectedGroup thay đổi
    useEffect(() => {
        const fetchTopGroupData = async () => {
            setIsLoading(true);
            setError(null);
            setTableData([]);// Xóa dữ liệu cũ

            try {
                const groupQuery: TGroupQuery = { group: selectedGroup };
                const result = await clientFetch<TScoreByGroup[]>(
                    api.reports.topGroup(groupQuery)
                );
                setTableData(result as TScoreByGroup[]);
            } catch (err) {
                console.error("Error fetching top group data:", err);
                setError("Failed to load top scores for this group. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopGroupData();
    }, [selectedGroup]);

    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <DataTable
                        data={tableData}
                        isLoading={isLoading}
                        error={error}
                        fullGroups={fullGroups}
                        selectedGroup={selectedGroup}
                        setSelectedGroup={setSelectedGroup}
                    />
                </div>
            </div>
        </div>
    );
}