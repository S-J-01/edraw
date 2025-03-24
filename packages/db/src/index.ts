import { PrismaClient } from "@prisma/client";
import type { Room } from "@prisma/client";

export const prisma = new PrismaClient();
export type {Room}
