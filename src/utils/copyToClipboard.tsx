import { toast } from "sonner";

export const handleCopyToClipboard = (url: string) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.success("Post link copied to clipboard!");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Failed to copy the post link.");
    });
};
