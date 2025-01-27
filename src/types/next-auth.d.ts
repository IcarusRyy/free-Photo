import "next-auth";
import { UserRole } from "@/types/auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  }

  interface Session {
    user: User & {
      role: UserRole;
    };
  }
}
