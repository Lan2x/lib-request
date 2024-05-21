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
import { HistoryColumn } from "./columns";
import { HistoryModal } from "./history-modal";
import { AddHistoryModal } from "./add-history-modal";
import { useRouter } from "next/navigation";

interface CellActionProps {
  data: HistoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [addRequestModal, setAddRequestModal] = useState(false);
  const [clearanceModal, setClearanceModal] = useState(false);
  const [selected, setSelected] = useState<HistoryColumn | undefined>();

  const router = useRouter();

  return (
    <>
      {selected && (
        <AddHistoryModal
          open={addRequestModal}
          onClose={() => {
            setSelected(undefined);
            setAddRequestModal(false);
          }}
          data={selected}
          requestId={data.requestId.toString()}
        />
      )}

      {selected && (
        <HistoryModal
          open={clearanceModal}
          onClose={() => {
            setSelected(undefined);
            setClearanceModal(false);
          }}
          data={selected}
        />
      )}

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
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSelected(data);
              setClearanceModal(true);
            }}
            className="cursor-pointer"
          >
            <ScrollTextIcon className="mr-2 h-4 w-4" />
            Add Stage
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
