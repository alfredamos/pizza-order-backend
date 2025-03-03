import { Role } from "@prisma/client";

export const isAdminRole = (role: string) => role === Role.Admin;