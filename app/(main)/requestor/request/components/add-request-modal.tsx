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
import { RequestsColumn } from "./columns";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

export const addStudentSchema = z.object({
  userId: z.number(),
  id: z.string(),
  book_name: z.string().min(1),
  author: z.string().min(1),
  copyright_date: z.string().min(1),
  unit_cost: z.string().min(1),
  total_cost: z.string(),
  quantity: z.string(),
});

interface AddStudentModalInterface {
  open: boolean;
  onClose: () => void;
  data?: RequestsColumn;
}

export const AddRequestModal: React.FC<AddStudentModalInterface> = ({
  open,
  onClose,
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const title = data ? `Edit request` : "Add request";
  const description = data
    ? `Edit the selected request`
    : `Enter request details`;
  const buttonText = data ? "Save Changes" : "Add request";
  const message = data
    ? "Request edited successfully"
    : "Request added successfully";

  interface userTypeInterface {
    id: number;
    userType: {
      id: number;
      user_type: string;
      created_at: Date;
    };
  }

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof addStudentSchema>>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      userId: session?.user.id || 0,
      id: data?.id.toString() || "",
      book_name: data?.book_name || "",
      author: data?.author || "",
      copyright_date: data?.copyright_date || "",
      unit_cost: data?.unit_cost || "",
      total_cost: data?.total_cost || "",
      quantity: data?.quantity || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addStudentSchema>) => {
    console.log({ values });
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/requestor/request/api/update-request/${data.id}`,
          values
        );
      } else {
        await axios.post("/requestor/request/api/add-request", values);
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
                name="book_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Book Name </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}
                        placeholder="Book Name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Author Name </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...field}
                          placeholder="Author"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="copyright_date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Copyright Date </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Copyright Date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Unit Cost </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          {...field}
                          placeholder="Unit Cost"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total_cost"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Total Cost </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Total Cost"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Quantity </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantity"
                          value={field.value || ""}
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
