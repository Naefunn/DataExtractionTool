"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "file must be a PDF"
    ),
});

export default function UploadForm() {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Uploaded Successfully");
    },
    onUploadError: (err) => {
      console.error("error occured while uploading", err);
      toast("Error occured whilst uploading", {
        description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validate the file
    const validatedFields = schema.safeParse({ file });

    console.log(validatedFields);

    if (!validatedFields.success) {
      toast("Something went wrong", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file",
      });
      return;
    }

    toast("Processing PDF", {
      description: "Our AI is processing your document!",
    });

    const resp = await startUpload([file]);
    if (!resp) {
      return;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
