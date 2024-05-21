"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, ScrollTextIcon } from "lucide-react";
import { useState } from "react";
import { AddBookModal } from "./add-book-modal";
import { BooksColumn } from "./columns";
// import { HistoryModal } from "./history-modal";

interface CellActionProps {
  data: BooksColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [addRequestModal, setAddRequestModal] = useState(false);
  const [clearanceModal, setClearanceModal] = useState(false);
  const [selected, setSelected] = useState<BooksColumn | undefined>();

  return (
    <>
      {selected && (
        <AddBookModal
          open={addRequestModal}
          onClose={() => {
            setSelected(undefined);
            setAddRequestModal(false);
          }}
          data={selected}
        />
      )}

      {/* {selected && (
        <HistoryModal
          open={clearanceModal}
          onClose={() => {
            setSelected(undefined);
            setClearanceModal(false);
          }}
          data={selected}
        />
      )} */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setSelected(data);
              setAddRequestModal(true);
            }}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => {
              setSelected(data);
              setClearanceModal(true);
            }}
            className="cursor-pointer"
          >
            <ScrollTextIcon className="mr-2 h-4 w-4" />
            Show History
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
