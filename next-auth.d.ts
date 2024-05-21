// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { User } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      firstName: string;
      middleName: string;
      lastName: string;
      email: string;
      UserType: {
        id: number;
        user_type: string;
        created_at: Date;
      };
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    UserType: {
      id: number;
      user_type: string;
      created_at: Date;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    UserType: {
      id: number;
      user_type: string;
      created_at: Date;
    };
  }
}
