import {z} from "zod";

export const signupProp = z.object({
    username : z.string().min(1).max(50),
    password: z.string().min(1).max(50)
})

export const createRoomSchema = z.object({
    slug: z.string().min(1).max(25),
    adminId : z.string()
})