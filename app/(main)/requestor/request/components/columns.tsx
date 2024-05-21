"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export type RequestsColumn = {
  id: number;
  book_name: string;
  author: string;
  copyright_date: string;
  unit_cost: string;
  total_cost: string;
  date_requested: string;
  status: string;
  quantity: string;
};

export const columns: ColumnDef<RequestsColumn>[] = [
  {
    accessorKey: "book_name",
    header: "Book Name",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "copyright_date",
    header: "Copyright Date",
  },
  {
    accessorKey: "unit_cost",
    header: "Unit Cost",
  },
  {
    accessorKey: "total_cost",
    header: "Total Cost",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "date_requested",
    header: "Date Requested ",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   accessorKey: "canLogin",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div
  //       className={
  //         row.original.canLogin
  //           ? "text-green-600 font-semibold text-xs"
  //           : "text-red-600 font-semibold text-xs"
  //       }
  //     >
  //       {row.original.canLogin ? "Can Login" : "Cannot login"}
  //     </div>
  //   ),
  // },

  {
    header: ({}) => <div className="hidden md:table-cell">Actions</div>,
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
