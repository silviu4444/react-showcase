import { environment } from "@/environment";

export const mapToPropertyImageSrc = (imageId: string | null | undefined) =>
  `${environment.cloudinary.cloudinaryCDN}${imageId}`;
