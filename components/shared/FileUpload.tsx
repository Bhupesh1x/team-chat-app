"use client";

import { UploadDropzone } from "@/lib/upladthing";

import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";

type Props = {
  endpoint: "serverImage" | "messageFile";
  value: string;
  onChange: (url?: string) => void;
};

function FileUpload({ endpoint, value, onChange }: Props) {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 mx-auto">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          className="bg-rose-500 p-1 text-white absolute top-0 right-0 shadow-sm rounded-full"
          type="button"
          onClick={() => onChange("")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}

export default FileUpload;
