"use client";

// ========================== LOGIN CODE ==========================

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import background from "@/components/assets/arial2.jpg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LockIcon, MailIcon } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { userType } from "@/lib/userTypes";
import prismadb from "@/lib/prismadb";

const SetupPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const signinData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    console.log(signinData);

    if (signinData?.error) {
      toast.error("Wrong username or password");
    } else {
      toast.success(`Welcome ${values.email}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.info("session", session);

    if (session?.user?.UserType?.user_type === "requestor") {
      router.push("/requestor/request");
    }
    if (session?.user?.UserType?.user_type === "requestor-admin") {
      router.push("/super-admin/request");
    }
  }, [session]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="absolute inset-0 -z-10 w-full bg-cover backdrop-opacity-90 bg-center-center bg-no-repeat opacity-90">
          <Image
            src={background}
            alt="Photo by Juan Encalada on Unsplash"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="grid md:grid-cols-1 gap-8 py-20 md:bg-black md:bg-opacity-10 md:h-screen md:w-full">
          {/* <div className="ml-6 flex flex-col items-start justify-center h-full w-full bg-opacity-50 bg-slate-400">
            <span className=" ml-32 text-white font-bold text-[50px]">
              UEP Clearance System Admin
            </span>
          </div> */}
          <div className="flex flex-col items-center justify-center h-full w-full px-8">
            <Card className="w-full mt-[-50px] max-w-xl h-[450px] px-2 py-6h-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
              <CardHeader className="flex flex-col items-center justify-center pt-16">
                {/* <Heading
                  title="Login Account"
                  description="Please enter your authorized login credentials to continue"
                /> */}

                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-center text-white">
                    Login Account
                  </h2>
                  <p className="text-sm text-white">
                    Please enter your authorized login credentials to continue
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onSubmit)}
                    className="flex justify-center items-center flex-col gap-8"
                  >
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-full  flex-col items-center justify-center ">
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            {/* <Input
                        disabled={loading}
                        placeholder="email"
                        {...field}
                      /> */}

                            <InputWithIcon
                              label="Emailasdasdasd"
                              Icon={<MailIcon />}
                              placeholder="sample@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-white">
                            Password{" "}
                          </FormLabel>
                          <FormControl>
                            <InputWithIcon
                              disabled={loading}
                              placeholder="********"
                              type="password"
                              label="password"
                              Icon={<LockIcon />}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="flex w-full items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline px-16 mt-8"
                    >
                      Login
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 z-index-999 pb-2 mr-2">
        <div className="text-gray-400 text-xs">
          Photo by
          <a
            href="https://unsplash.com/@juanencalada?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash "
            className="underline ml-1 mr-1 "
          >
            Juan Encalada
          </a>
          on
          <a
            className="underline ml-1 mr-1 "
            href="https://unsplash.com/photos/white-and-black-bus-running-near-the-mountain-6mcVaoGNz1w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          >
            Unsplash
          </a>
        </div>
      </div>
    </>
  );
};

export default SetupPage;
