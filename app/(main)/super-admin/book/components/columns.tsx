"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

export type BooksColumn = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publication_date: string;
  edition: string;
  created_at: string;
  quantity: string;
  price: string;
};

export const columns: ColumnDef<BooksColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
  },

  {
    accessorKey: "publisher",
    header: "Publisher",
  },
  {
    accessorKey: "publication_date",
    header: "Publication Date",
  },
  {
    accessorKey: "edition",
    header: "Edition",
  },
  {
    accessorKey: "call_number",
    header: "Call Number",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "created_at",
    header: "Created At",
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
