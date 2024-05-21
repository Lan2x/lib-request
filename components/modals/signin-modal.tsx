'use client';
import { useTerminalModal } from '@/hooks/use-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

const formSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(4),
});

const UserData = [
  {
    email: 'ticketcollector@gmail.com',
    password: '11112',
    path: 'ticket-collector',
  },
  {
    email: 'tollgate@gmail.com',
    password: '11112',
    path: 'toll-gate',
  },
];

export const SignInModal = () => {
  const UseModal = useTerminalModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // FIXME: Button type-submit not working
      // TODO: Check if the email and password match the dummy data
      const userData = UserData.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );

      if (!userData) {
        toast.error('Invalid email or password.');
        return;
      }

      router.push(`/${userData.path}`);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Login Account"
      description="Authorized Users Only! Sign In to Proceed."
      isOpen={UseModal.isOpen}
      onClose={UseModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="email@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Password </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={loading}
                          placeholder="Enter Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
            <div className="pt-2 space-x-2 w-full">
              <Button disabled={loading} type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
