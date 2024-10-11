"use client";
import { useGetAllCategories } from "@/src/hooks/category.fetch.hook";
import { useCreatePost } from "@/src/hooks/post.mutate.hook";
import { createPostSchema } from "@/src/schemas/post.schema";
import { TImagesFile, TImagesPreview } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PPButton from "../../UI/button/PPButton";
import PPForm from "../../UI/form/PPForm";
import PPInput from "../../UI/form/PPInput";
import PPSelect, { TSelectOption } from "../../UI/form/PPSelect";
import PPTextEditor from "../../UI/form/PPTextEditor";
import PostImagesHandle from "./PostImagesHandle";
import { Switch } from "@nextui-org/switch";
import { Tooltip } from "@nextui-org/tooltip";

type TProps = {
  handleTabChange: (tabKey: "posts" | "favourites" | "create_post") => void;
  isUserVerified: boolean;
};

const CreateNewPost = ({ handleTabChange, isUserVerified }: TProps) => {
  const [isPremium, setIsPremium] = useState(false);
  const [imageSelectError, setImageSelectError] = useState(false);
  const [imagesFile, setImagesFile] = useState<TImagesFile[]>([]);
  const [imagesPreview, setImagesPreview] = useState<TImagesPreview[]>([]);
  const {
    mutate: handleCreatePost,
    isLoading: createPostLoading,
    isSuccess,
  } = useCreatePost();

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
    const postData = {
      ...data,
      isPremium: isPremium,
    };
    const images = imagesFile.map((item) => item.file);
    const formData = new FormData();
    formData.append("data", JSON.stringify(postData));
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
    <div className="container max-w-5xl mt-6 dark:bg-gray-800 dark:p-6 rounded-lg">
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
        <Tooltip
          content={
            !isUserVerified && "Non verified user cannot create premium post"
          }
          color={"danger"}
          placement="top-start"
          closeDelay={50}
          isDisabled={isUserVerified}
        >
          <div
            className={`mt-14 lg:mt-10 flex items-center space-x-4 w-fit  sm:col-span-2 ${
              !isUserVerified && "opacity-50"
            }`}
          >
            <p className="font-medium">
              <strong>Premium Status</strong>
              <span className="ml-1 text-gray-500 text-sm">
                (Only visible to verified users if selected)
              </span>
              :
            </p>
            <Switch
              aria-label="Toggle premium status"
              color="success"
              defaultSelected={false}
              isSelected={isPremium}
              onValueChange={setIsPremium}
              size="sm"
              isDisabled={!isUserVerified}
            />
          </div>
        </Tooltip>
        <div className="mt-4 sm:col-span-2 ">
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
