"use client";
import { TImagesFile, TImagesPreview, TSuccess } from "@/src/types";
import PPForm from "../../UI/form/PPForm";
import PPInput from "../../UI/form/PPInput";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/src/lib/axiosInstance";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PPSelect, { TSelectOption } from "../../UI/form/PPSelect";
import PPTextEditor from "../../UI/form/PPTextEditor";
import PPButton from "../../UI/button/PPButton";
import { ChangeEvent, useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { toast } from "sonner";
import PostImagesHandle from "./PostImagesHandle";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "@/src/schemas/post.schema";
import { useCreatePost } from "@/src/hooks/post.mutate.hook";
import { useRouter } from "next/navigation";
import PPAutocomplete from "../../UI/form/PPAutocomplete";
import { useGetAllCategories } from "@/src/hooks/category.fetch.hook";

type TProps = {
  handleTabChange: (tabKey: "posts" | "favourites" | "create_post") => void;
};

const CreateNewPost = ({ handleTabChange }: TProps) => {
  const [imageSelectError, setImageSelectError] = useState(false);
  const [imagesFile, setImagesFile] = useState<TImagesFile[]>([]);
  const [imagesPreview, setImagesPreview] = useState<TImagesPreview[]>([]);
  const {
    mutate: handleCreatePost,
    isLoading: createPostLoading,
    isSuccess,
  } = useCreatePost();
  const router = useRouter();

  const { data: categories, isLoading: categoriesLoading } =
    useGetAllCategories();

  const categoriesOptions: TSelectOption[] =
    (
      categories &&
      categories?.data?.map((category) => ({
        label: category?.name,
        key: category?._id,
      }))
    )?.sort((a, b) => a.label.localeCompare(b.label)) || [];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (imagesFile.length === 0) {
      setImageSelectError(true);
      return;
    }
    setImageSelectError(false);
    const images = imagesFile.map((item) => item.file);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (const image of images) {
      formData.append("images", image);
    }

    handleCreatePost(formData);
  };

  useEffect(() => {
    if (isSuccess && !createPostLoading) {
      handleTabChange("posts");
    }
  }, [isSuccess]);

  return (
    <div className="container max-w-5xl mx-auto mt-6">
      <h1 className="text-xl mb-6 font-bold tracking-wide">Create New Post</h1>
      <PPForm
        onSubmit={onSubmit}
        resolver={zodResolver(createPostSchema)}
        className="grid sm:grid-cols-2 gap-x-6 gap-y-8"
      >
        <PPInput label="Title" name="title" type="text" variant="bordered" />
        <PPSelect
          label="Category"
          name="category"
          variant="bordered"
          options={categoriesOptions}
          isDisabled={categoriesLoading}
        />

        <PPTextEditor
          name="description"
          label="Description"
          className="col-span-1 sm:col-span-2"
        />

        <div className="mt-16 sm:col-span-2 ">
          <PostImagesHandle
            imagesFile={imagesFile}
            imagesPreview={imagesPreview}
            setImagesFile={setImagesFile}
            setImagesPreview={setImagesPreview}
            imageSelectError={imageSelectError}
            setImageSelectError={setImageSelectError}
          />
          <div>
            <PPButton
              buttonText="Create New Post"
              className="mt-8"
              isLoading={createPostLoading}
            />
          </div>
        </div>
      </PPForm>
    </div>
  );
};

export default CreateNewPost;
