"use client";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

export type TSelectOption = { key: string; label: string };

type TProps = {
  name: string;
  label: string;
  className?: string;
};

const toolbarOptions = [
  [{ font: [] }],
  [{ header: [3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["clean"],
];

export default function PPTextEditor({ name, label, className }: TProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`${className} space-y-2 relative min-h-60`}>
          <label htmlFor={name} className="text-gray-500 font-medium">
            {label}
          </label>
          <ReactQuill
            theme="snow"
            value={field.value || ""}
            onChange={field.onChange}
            modules={{ toolbar: toolbarOptions }}
            className="h-60 rounded-xl"
          />
          {error && (
            <div className="absolute left-[0.1rem] bottom-[-4.2rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
              <small>{error.message}</small>
            </div>
          )}
        </div>
      )}
    />
  );
}
