"use client";

import { useTerminalModal } from "@/hooks/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { signOut } from "next-auth/react";

const formSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    firstName?: string | null;
    middleName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } | null;
}

export const EditProfile: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      middleName: user?.middleName || "",
      lastName: user?.lastName || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`/api/auth/profile/${user?.id}/changeProfile`, values);
      toast.success("You will now be logged out");
      toast.success("Profile updated successfully.");
      setTimeout(() => {
        signOut({ callbackUrl: "/" });
      }, 2000);
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
      title="Edit Name"
      description="When updating your profile preferences, note that admin views will reflect the changes."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> First Name </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Middle Name </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Middle Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Last Name </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Enter Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2 space-x-2 w-full">
                <Button disabled={loading} type="submit" className="w-full">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
