"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export type HistoryColumn = {
  id: number;
  stage: string;
  remarks: string;
  created_at: string;
  requestId: number;
};

export const columns: ColumnDef<HistoryColumn>[] = [
  {
    accessorKey: "stage",
    header: "Stage",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "created_at",
    header: "Created At ",
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
