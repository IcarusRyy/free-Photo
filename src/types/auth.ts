export enum UserRole {
  GUEST = "guest",
  USER = "user",
  VIP = "vip",
  ADMIN = "admin",
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  vipExpireDate?: Date;
}
