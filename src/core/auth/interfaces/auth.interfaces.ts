export type AuthMode = "login" | "register";

export type RegisterDto = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

export type RoleType = "USER" | "MODERATOR" | "ADMIN";
