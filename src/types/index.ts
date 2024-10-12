import { z } from "zod";
import { GetProp, UploadProps } from "antd";
import { linkSchema } from "@/schema/link.schema";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export type LinkType = z.infer<typeof linkSchema>;