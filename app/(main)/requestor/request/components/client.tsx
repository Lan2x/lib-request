"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { FileBarChartIcon, FileDownIcon, Plus } from "lucide-react";
import { AddRequestModal } from "./add-request-modal";
import { useState } from "react";
import { ReactSpreadsheetImport, StepType } from "react-spreadsheet-import";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { RequestsColumn, columns } from "./columns";

interface RequestsClientProps {
  data: RequestsColumn[];
}

const RequestsClient: React.FC<RequestsClientProps> = ({ data }) => {
  const [addModal, setAddModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const router = useRouter();

  const searchFormSchema = z.object({
    bookName: z.string(),
  });

  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      bookName: "",
    },
  });

  const onSearch = async (values: z.infer<typeof searchFormSchema>) => {
    console.log({ values });
    router.push("/requestor/request?bookName=" + values.bookName);
  };

  const exportToCSV = (apiData: any, fileName: string) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <>
      <AddRequestModal open={addModal} onClose={() => setAddModal(false)} />

      <div className="flex items-center justify-between mb-8">
        <Heading title="Requests Page" description="Manage request details" />
        <div className="flex gap-5">
          <Button
            size={"sm"}
            onClick={() => exportToCSV(data, "students")}
            className="flex items-center ml-auto py-2"
          >
            <FileBarChartIcon className="h-4 w-4" />
            <span className="ml-4 hidden sm:inline"> Generate Report </span>
          </Button>
          <Button
            size={"sm"}
            onClick={() => setAddModal(true)}
            className="flex items-center ml-auto py-2"
          >
            <Plus className="h-4 w-4" />
            <span className="ml-4 hidden sm:inline"> Add Request </span>
          </Button>
        </div>
      </div>
      <Form {...searchForm}>
        <form
          onSubmit={searchForm.handleSubmit(onSearch)}
          className="flex gap-5"
        >
          <FormField
            control={searchForm.control}
            name="bookName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="book name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            <MagnifyingGlassIcon className="h-4 w-4 mr-2" /> Search
          </Button>
        </form>
      </Form>

      <DataTable columns={columns} data={data} />
    </>
  );
};

export default RequestsClient;
