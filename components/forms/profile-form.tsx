"use client";

import { EditProfile } from "@/components/modals/edit-profile-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTerminalModal } from "@/hooks/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const initialData = {
  name: "Maredith Burac",
  email: "mrdthbrc07@gmail.com",
  password: "password",
};

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const UseModal = useTerminalModal();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  return (
    <>
      {/* <EditProfile /> */}
      <div className="flex items-center justify-between">
        <Heading
          title="Profile"
          description="Manage your profile preferences"
        />
        <Button
          variant="default"
          size="sm"
          onClick={() => UseModal.onOpen()}
          className="flex items-center"
        >
          <Edit className="h-4 w-4" />
          <span className="ml-4 hidden sm:inline">Edit Profile</span>
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form action={() => {}} className="space-y-4 w-full pt-6">
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 gap-2">
                  <FormLabel className="flex items-center">Your Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      style={{
                        cursor: "default",
                      }}
                      className="flex items-center justify-start"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 gap-2">
                  <FormLabel className="flex items-center">
                    Your Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                      style={{ cursor: "default" }}
                      className="flex items-center justify-start"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 gap-2">
                  <FormLabel className="flex items-center">
                    Your Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      style={{ cursor: "default" }}
                      className="flex items-center justify-start"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
