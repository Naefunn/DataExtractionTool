"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { toast } from "sonner";
import { generatePdfSummary } from "@/actions/upload-actions";
import { useRef, useState } from "react";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
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
        setIsLoading(false);
        return;
      }

      const resp = await startUpload([file]);
      if (!resp) {
        toast("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toast("Processing PDF", {
        description: "Our AI is processing your document!",
      });

      const summary = await generatePdfSummary(resp);
      console.log({ summary });

      const { data = null, message = null } = summary || {};
      if (data) {
        toast("Saving PDF..", {
          description: "Not long now! We are saving your summary",
        });
        formRef.current?.reset();
        setIsLoading(false);
        // if (data.summary) {
        //   // save the summary to db
        // }
      } else {
        toast("Unknown error occured", {
          description: message || "Unknown error occured",
        });
        formRef.current?.reset();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error occured", error);
      formRef.current?.reset();
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
