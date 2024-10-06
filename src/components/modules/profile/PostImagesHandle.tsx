import { TImagesFile, TImagesPreview } from "@/src/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GiSkullCrossedBones } from "react-icons/gi";
import { RiErrorWarningLine } from "react-icons/ri";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

type TProps = {
  imageSelectError: boolean;
  setImageSelectError: Dispatch<SetStateAction<boolean>>;
  imagesFile: TImagesFile[];
  setImagesFile: Dispatch<SetStateAction<TImagesFile[]>>;
  imagesPreview: TImagesPreview[];
  setImagesPreview: Dispatch<SetStateAction<TImagesPreview[]>>;
};

const PostImagesHandle = ({
  imageSelectError,
  setImageSelectError,
  imagesFile,
  imagesPreview,
  setImagesFile,
  setImagesPreview,
}: TProps) => {
  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    setImageSelectError(false);
    if (imagesFile.length === 4 && imagesPreview.length === 4) {
      toast.message("Cannot select more then 4 images");
      return;
    }
    const img = e.target.files![0];
    const id =
      imagesFile.length > 0 ? imagesFile[imagesFile.length - 1].id + 1 : 1;
    if (img) {
      setImagesFile((prev) => {
        const isExist = prev.find((image) => image.file.name === img.name);
        if (!isExist) {
          return [...prev, { id, file: img }];
        }
        return prev;
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result;
        setImagesPreview((prev) => {
          const isExist = prev.find((image) => image.url === url);
          if (!isExist) return [...prev, { id, url }];
          return prev;
        });
      };
      reader.readAsDataURL(img);
    }
  };
  const handleImageDelete = (id: number) => {
    setImageSelectError(false);
    setImagesPreview((prev) => prev.filter((item) => item.id !== id));
    setImagesFile((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="flex items-center space-x-8 select-none ">
      <div
        className={`min-w-40 min-h-24 py-4 flex items-center px-4 rounded-md border-2 border-dashed 
        ${
          imageSelectError
            ? "border-red-600"
            : imagesFile?.length === 0
            ? "border-yellow-500"
            : "border-common-600"
        }
        `}
      >
        {imagesPreview.length > 0 ? (
          <div className="flex gap-x-3 gap-y-3 flex-wrap ">
            {imagesPreview.map((image) => (
              <div
                key={image.id}
                className="relative px-0.5 py-[0.14rem] border-[1px] border-common-600 rounded-md h-20 w-32"
              >
                <img
                  src={image.url as string}
                  alt={`${image}`}
                  className="object-cover object-center rounded-md h-full w-full"
                />

                <RxCross2
                  className="absolute top-0 right-0 z-20 hover:bg-common-500 cursor-pointer duration-150 hover:text-white rounded-bl-md size-5 bg-common-600 text-white"
                  onClick={() => handleImageDelete(image.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-lg font-medium  flex flex-col items-center ${
              imageSelectError ? "text-red-600" : "text-yellow-500"
            }`}
          >
            {imageSelectError ? (
              <GiSkullCrossedBones className="size-12" />
            ) : (
              <RiErrorWarningLine className="size-12" />
            )}
            <p>
              {imageSelectError ? "Please select image" : "No Image Selected"}
            </p>
          </div>
        )}
      </div>
      <label htmlFor="postImage" className="rounded-full py-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-common-600 text-gray-200 hover:text-white cursor-pointer duration-150">
          <RiImageAddFill className="size-10" />
        </div>
      </label>
      <input
        type="file"
        accept=".png, .jpeg, .jpg, image/png, image/jpeg"
        multiple
        className="hidden"
        id="postImage"
        onChange={handleImages}
      />
    </div>
  );
};

export default PostImagesHandle;
