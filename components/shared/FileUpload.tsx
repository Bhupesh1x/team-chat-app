"use client";

import Image from "next/image";

import { FileIcon, X } from "lucide-react";

import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/upladthing";

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

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="fill-indigo-200 stroke-indigo-400 h-10 w-10" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>

        <button
          className="bg-rose-500 p-1 text-white absolute -top-2 -right-2 shadow-sm rounded-full"
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
