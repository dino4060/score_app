// src/components/reports/subject-checkboxes.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TSubject } from "@/types/report.types";

interface SubjectCheckboxesProps {
    allSubjects: TSubject[];
    selectedSubjects: TSubject[];
    isAllSelected: boolean;
    onSelectAll: (checked: boolean) => void;
    onSubjectChange: (subject: TSubject, checked: boolean) => void;
}

export default function SubjectCheckboxes({
    allSubjects,
    selectedSubjects,
    isAllSelected,
    onSelectAll,
    onSubjectChange,
}: SubjectCheckboxesProps) {
    return (
        <Card className="rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl font-medium">Choose subjects</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2 mr-4">
                        <Checkbox
                            id="all-subjects"
                            checked={isAllSelected}
                            onCheckedChange={onSelectAll}
                        />
                        <label
                            htmlFor="all-subjects"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            All Subjects
                        </label>
                    </div>
                    {allSubjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                                id={subject}
                                checked={selectedSubjects.includes(subject)}
                                onCheckedChange={(checked) => onSubjectChange(subject, Boolean(checked))}
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
    );
}