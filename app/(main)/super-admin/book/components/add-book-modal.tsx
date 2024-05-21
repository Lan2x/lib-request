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
import { BooksColumn } from "./columns";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { LargeModal } from "@/components/ui/large-modal";

export const addBookSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  author: z.string().min(1),
  isbn: z.string().min(1),
  publisher: z.string(),
  publication_date: z.string(),
  edition: z.string(),
  quantity: z.string(),
  price: z.string(),
});

interface AddBookModalInterface {
  open: boolean;
  onClose: () => void;
  data?: BooksColumn;
}

export const AddBookModal: React.FC<AddBookModalInterface> = ({
  open,
  onClose,
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const title = data ? `Edit book` : "Add book";
  const description = data ? `Edit the selected book` : `Enter book details`;
  const buttonText = data ? "Save Changes" : "Add book";
  const message = data ? "Book edited successfully" : "Book added successfully";

  const { data: session } = useSession();

  const form = useForm<z.infer<typeof addBookSchema>>({
    resolver: zodResolver(addBookSchema),
    defaultValues: {
      id: data?.id.toString() || "",
      title: data?.title || "",
      author: data?.author || "",
      isbn: data?.isbn || "",
      publisher: data?.publisher || "",
      publication_date: data?.publication_date || "",
      edition: data?.edition || "",
      quantity: data?.quantity,
      price: data?.price || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addBookSchema>) => {
    console.log({ values });
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/super-admin/book/api/update-book/${data.id}`,
          values
        );
      } else {
        await axios.post("/super-admin/book/api/add-book", values);
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
    <LargeModal
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
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Title </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}
                        placeholder="Title"
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
                  name="isbn"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> ISBN </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ISBN " />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publisher"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Publisher </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Publisher"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="publication_date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Publication Date </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Publication Date"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="edition"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Edition </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Edition"
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel> Price </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Price"
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
    </LargeModal>
  );
};
