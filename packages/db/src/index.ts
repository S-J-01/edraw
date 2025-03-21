import { PrismaClient } from "@prisma/client";
import { Room } from "@prisma/client";

export const prisma = new PrismaClient();
export type {Room}
