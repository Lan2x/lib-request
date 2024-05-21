import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createUser } from "@/lib/utils";
import { userType } from "@/lib/userTypes";
import AuthProvider from "@/context/AuthProvider";
import { ToasterProvider } from "@/context/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clearance System Admin",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await createUser("cs@email.com", "requestor");
  await createUser("requestor-admin@email.com", "requestor-admin");

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <ToasterProvider />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
