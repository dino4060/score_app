"use client";

import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { TScoreByGroup } from "@/types/score.types";
import {
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    IconGripVertical
} from "@tabler/icons-react";
import {
    flexRender,
    Row
} from "@tanstack/react-table";


export function DragHandle({ id }: { id: number }) {
    const { attributes, listeners } = useSortable({
        id: id,
    })

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="text-muted-foreground size-7 hover:bg-transparent"
        >
            <IconGripVertical className="text-muted-foreground size-3" />
            <span className="sr-only">Drag to reorder</span>
        </Button>
    )
}

export function DraggableRow({ row }: { row: Row<TScoreByGroup> }) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: row.original.registrationNumber,
    })

    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            data-dragging={isDragging}
            ref={setNodeRef}
            className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}