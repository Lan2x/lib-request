"use client";

import { EditEmailModal } from "@/components/modals/edit-email-modal";
import { EditPasswordModal } from "@/components/modals/edit-password-modal";
import { EditProfile } from "@/components/modals/edit-profile-modal";
import { LogoutAlertModal } from "@/components/modals/logout-alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Edit,
  Edit3,
  LockKeyholeIcon,
  LogOut,
  MailQuestionIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1),
});

type ProfileFormValues = z.infer<typeof formSchema>;

const ProfileForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [modal, setModal] = useState<
    "profile" | "username" | "password" | undefined
  >(undefined);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: session?.user?.firstName || "",
      middleName: session?.user?.middleName || "",
      lastName: session?.user?.lastName || "",
      email: session?.user.email || "",
    },
  });

  return (
    <>
      <EditProfile
        isOpen={modal === "profile"}
        onClose={() => setModal(undefined)}
        user={session?.user || null}
      />
      <EditEmailModal
        isOpen={modal === "username"}
        onClose={() => setModal(undefined)}
        user={session?.user || null}
      />{" "}
      <EditPasswordModal
        isOpen={modal === "password"}
        onClose={() => setModal(undefined)}
        user={session?.user || null}
      />
      <LogoutAlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => toast.success("Deleted Successfully")}
        loading={loading}
      />
      <div className="flex items-center justify-between mb-8">
        <div>
          <Heading
            title="Profile"
            description="Manage your profile preferences"
          />
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => setModal("profile")}
            className="flex items-center"
          >
            <Edit3 className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Edit Name</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setModal("username")}
            className="flex items-center"
          >
            <MailQuestionIcon className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Edit Username</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setModal("password")}
            className="flex items-center"
          >
            <LockKeyholeIcon className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Edit Password</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            className="flex items-center "
          >
            <LogOut className="h-4 w-4" />
            <span className="ml-2 hidden text-xs sm:inline">Logout</span>
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form action={() => {}} className="grid grid-cols-1 md:grid-cols-2">
          <div className="mt-2 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-lg text-black font-bold">
                Account Information
              </p>
            </div>
            <div className="mt-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 gap-2">
                    <FormLabel className="ml-4 flex items-center text-xs col-span-1">
                      First Name
                    </FormLabel>
                    <FormControl className="col-span-2">
                      <Input
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
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 gap-2">
                    <FormLabel className="ml-4 flex items-center text-xs col-span-1">
                      Middle Name
                    </FormLabel>
                    <FormControl className="col-span-2">
                      <Input
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
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 gap-2">
                    <FormLabel className="ml-4 flex items-center text-xs col-span-1">
                      Last Name
                    </FormLabel>
                    <FormControl className="col-span-2">
                      <Input
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
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-3 gap-2">
                    <FormLabel className="ml-4 flex items-center text-xs col-span-1">
                      Your Email
                    </FormLabel>
                    <FormControl className="col-span-2">
                      <Input
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
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
