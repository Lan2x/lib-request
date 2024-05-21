"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { HistoryColumn } from "./columns";
import axios from "axios";
import { useRouter } from "next/navigation";

import prismadb from "@/lib/prismadb";
import getClearance from "../api/get-history/get-history";
import { useSession } from "next-auth/react";
import getHistory from "../api/get-history/get-history";
import { Stage } from "@prisma/client";

interface HistoryModalInterface {
  open: boolean;
  onClose: () => void;
  data?: HistoryColumn;
}

export const HistoryModal: React.FC<HistoryModalInterface> = ({
  open,
  onClose,
  data,
}) => {
  const [stages, setStages] = useState<Stage[]>();

  useEffect(() => {
    if (open) {
      getHistory(data?.id as number).then((data) => {
        if (data !== null) {
          setStages(data);
        }
      });
    }
  }, [open]);

  return (
    <Modal
      title={"History"}
      description={""}
      isOpen={open}
      onClose={() => {
        onClose();
      }}
    >
      <div>
        {stages?.length === 0 && <div>no clearance</div>}

        {stages &&
          stages.map((item, index) => (
            <div className="flex items-center space-x-2" key={index}>
              {/* <Checkbox id="terms" checked={item.isFinished} disabled /> */}
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {/* {`${item.clearanceName} (${item.finishedDate})`} */}
              </label>
            </div>
          ))}
      </div>
    </Modal>
  );
};
