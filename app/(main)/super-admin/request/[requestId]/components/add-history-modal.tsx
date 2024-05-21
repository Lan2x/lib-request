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

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { HistoryColumn } from "./columns";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

export const addHistorySchema = z.object({
  requestId: z.string(),
  id: z.string(),
  stage: z.string().min(1),
  remarks: z.string().min(1),
});

interface AddHistoryModalInterface {
  open: boolean;
  onClose: () => void;
  data?: HistoryColumn;
  requestId: string;
}

export const AddHistoryModal: React.FC<AddHistoryModalInterface> = ({
  open,
  onClose,
  data,
  requestId,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const title = data ? `Edit history` : "Add history";
  const description = data
    ? `Edit the selected history`
    : `Enter history details`;
  const buttonText = data ? "Save Changes" : "Add history";
  const message = data
    ? "History edited successfully"
    : "History added successfully";

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof addHistorySchema>>({
    resolver: zodResolver(addHistorySchema),
    defaultValues: {
      requestId: requestId,
      id: data?.id.toString() || "",
      stage: data?.stage || "",
      remarks: data?.remarks || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addHistorySchema>) => {
    console.log({ values });
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/super-admin/request/api/update-history/${data.id}`,
          values
        );
      } else {
        await axios.post(`/super-admin/request/0/api/add-history`, values);
      }
      toast.success(message);
      router.refresh();
      onClose();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `Error: ${error.response?.status} - ${error.response?.data.message}`
        );
        console.log(error.response?.data.message);
      } else {
        // Handle other error types if necessary
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      description={description}
      isOpen={open}
      onClose={() => {
        form.reset();
        onClose();
      }}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Stage </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}
                        placeholder="Stage"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="remarks"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Remarks </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...field}
                          placeholder="Remarks"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-2 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  type="submit"
                  onClick={() => console.log(form.formState)}
                >
                  {buttonText}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
