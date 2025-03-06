import {z} from "zod";

export const signupProp = z.object({
    username : z.string().min(1).max(50),
    password: z.string().min(1).max(50)
})