import {z} from "zod";

export const linkSchema = z.object({
    id: z.number().positive().int(),
    link: z.string().url(),
    platform: z.string(),
})