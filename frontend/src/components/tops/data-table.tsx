// @/components/data-table.tsx
"use client"

import { DraggableRow, DragHandle } from "@/components/tops/drog-and-drag"
import { TableCellViewer } from "@/components/tops/table-cell-viewer"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TGroup, TSubject } from "@/types/report.types"
import { TScoreByGroup } from "@/types/score.types"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import * as React from "react"

export function DataTable({
  data: tableData,
  isLoading,
  error,
  fullGroups,
  selectedGroup,
  setSelectedGroup,
}: {
  data: TScoreByGroup[];
  isLoading: boolean;
  error: string | null;
  fullGroups: { name: TGroup, subjects: TSubject[], language2Type?: string }[];
  selectedGroup: TGroup;
  setSelectedGroup: React.Dispatch<React.SetStateAction<TGroup>>;
}) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => tableData?.map(({ registrationNumber }) => registrationNumber) || [],
    [tableData]
  )

  const columns = React.useMemo<ColumnDef<TScoreByGroup>[]>(() => {
    const currentGroup = fullGroups.find(g => g.name === selectedGroup);
    if (!currentGroup) {
      return [];
    }

    const baseColumns: ColumnDef<TScoreByGroup>[] = [
      {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.registrationNumber} />,
      },
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
      },
      {
        accessorKey: "registrationNumber",
        header: "Registration Number",
        cell: ({ row }) => (
          <TableCellViewer item={{ header: row.original.registrationNumber.toString(), ...row.original as any }} />
        ),
        enableHiding: false,
      },
    ];

    const subjectColumns: ColumnDef<TScoreByGroup>[] = currentGroup.subjects.map(subject => ({
      accessorKey: subject,
      // CHỈNH SỬA HEADER: language2 thành 2nd Language (language2Type)
      header: () => (
        <div className="text-center">
          {subject === 'language2' && currentGroup.language2Type
            ? `2nd Language (${currentGroup.language2Type})`
            : subject.charAt(0).toUpperCase() + subject.slice(1)}
        </div>
      ),
      // CHỈNH SỬA CELL: Giá trị canh giữa
      cell: ({ row }) => {
        const score = row.original[subject as keyof TScoreByGroup];
        return (
          <div className="text-center">
            {score !== null && score !== undefined ? (score as number).toFixed(2) : "-"}
          </div>
        );
      },
      size: 120, // Đặt độ rộng bằng nhau
      minSize: 80,
      maxSize: 200,
    }));

    const totalAndRankingColumns: ColumnDef<TScoreByGroup>[] = [
      {
        accessorKey: "total",
        header: () => <div className="text-center">Total</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.total.toFixed(2)}</div>
        ),
        size: 120, // Đặt độ rộng bằng nhau
        minSize: 80,
        maxSize: 200,
      },
      {
        id: "ranking",
        header: () => <div className="text-center">Ranking</div>,
        cell: ({ row }) => {
          const rank = row.index + 1;
          return (
            <div className="text-center">
              {rank <= 10 ? rank.toString() : "-"}
            </div>
          );
        },
        size: 120, // Đặt độ rộng bằng nhau
        minSize: 80,
        maxSize: 200,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "actions",
        cell: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                size="icon"
              >
                <IconDotsVertical />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Make a copy</DropdownMenuItem>
              <DropdownMenuItem>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];

    return [...baseColumns, ...subjectColumns, ...totalAndRankingColumns];
  }, [selectedGroup, fullGroups]);

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.registrationNumber.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newData = arrayMove([...tableData], oldIndex, newIndex);
        table.setPageSize(table.getState().pagination.pageSize);
      }
    }
  }


  return (
    <Tabs
      defaultValue={selectedGroup}
      onValueChange={(value) => setSelectedGroup(value as TGroup)}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          {fullGroups.map((groupItem) => (
            <TabsTrigger key={groupItem.name} value={groupItem.name}>
              {groupItem.name}

            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent
        value={selectedGroup}
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        {isLoading ? (
          <div className="flex flex-col gap-4 p-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            <p>{error}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
              <Table>
                <TableHeader className="bg-muted sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                  {table.getRowModel().rows?.length ? (
                    <SortableContext
                      items={dataIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow key={row.id} row={row as Row<TScoreByGroup>} />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results for this group.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>
        )}


        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

    </Tabs>
  )
}
