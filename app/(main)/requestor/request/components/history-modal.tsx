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
import { RequestsColumn } from "./columns";
import axios from "axios";
import { useRouter } from "next/navigation";

import prismadb from "@/lib/prismadb";
import getClearance from "../api/get-history/get-history";
import { useSession } from "next-auth/react";
import getHistory from "../api/get-history/get-history";
import { Stage } from "@prisma/client";

import { Chrono } from "react-chrono";

interface HistoryModalInterface {
  open: boolean;
  onClose: () => void;
  data?: RequestsColumn;
}

export const HistoryModal: React.FC<HistoryModalInterface> = ({
  open,
  onClose,
  data,
}) => {
  const [stages, setStages] = useState<
    {
      title: string;
      cardTitle: string;
      cardSubtitle: string;
    }[]
  >();

  useEffect(() => {
    if (open) {
      getHistory(data?.id as number).then((data) => {
        if (data !== null) {
          setStages(data);
        }
      });
    }
  }, [open]);

  useEffect(() => {
    console.log(stages);
  }, [stages]);

  const items = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      cardSubtitle:
        "Men of the British Expeditionary Force (BEF) wade out to..",
    },
  ];

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

        {stages && <Chrono mode="VERTICAL" items={stages} />}
      </div>
    </Modal>
  );
};
