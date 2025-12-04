import * as z from "zod";

export const propertyPhotoSchema = z.object({
  imageId: z.string(),
  source: z.string().optional(),
  publicId: z.string().optional(),
  timestamp: z.coerce.number().optional(),
  signature: z.string().optional(),
  version: z.coerce.number().optional()
});
