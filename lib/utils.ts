import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prismadb from "./prismadb";
import * as crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashPassword(password: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export function getCurrentDate(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Note: Months are zero-indexed, so add 1
  const day = currentDate.getDate();

  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
}

export function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): boolean {
  const hashedInputPassword = hashPassword(plainPassword);
  return hashedInputPassword === hashedPassword;
}

export const formatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export const createUser = async (email: string, type: string) => {
  try {
    const hashedPassword = hashPassword("password");

    const adminUser = await prismadb.tbl_user.findUnique({
      where: {
        email,
      },
    });

    if (!adminUser) {
      const userType = await prismadb.tbl_user_type.create({
        data: {
          user_type: type,
        },
      });
      const college = await prismadb.tbl_college.create({
        data: {
          college: "College of Science",
        },
      });
      await prismadb.tbl_user.create({
        data: {
          first_name: "first name",
          last_name: "last name",
          middle_name: "middle name",
          email,
          password: hashedPassword,
          course: "course",
          birthdate: "00-00-0000",
          college_department: "college_department",
          gender: "male",
          role: type,
          user_type: userType.id,
          image: "",
          college: college.id,
        },
      });
      console.log(`created user: ${adminUser}`);
    }
    console.log(`user: ${email} already exists`);
  } catch (error) {
    console.log(error);
  }
};

export const simplifyTime = (date: Date) => {
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const result = `${formattedDate} ${formattedTime}`;

  return result;
};
