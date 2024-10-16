import {z} from "zod";

export const linkSchema = z.object({
    serial: z.union([z.string(), z.number()]).default(1),
    url: z.string({message:"url must be a valid URL"}).url(),
    platform: z.string({message:"platform must be a valid platform"})
})