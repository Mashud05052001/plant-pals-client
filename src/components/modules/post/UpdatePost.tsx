"use client";
import PPButton from "@/src/components/UI/button/PPButton";
import PPInput from "@/src/components/UI/form/PPInput";
import PPSelect, { TSelectOption } from "@/src/components/UI/form/PPSelect";
import PPTextEditor from "@/src/components/UI/form/PPTextEditor";
import { useUpdatePost } from "@/src/hooks/post.mutate.hook";
import { updatePostSchema } from "@/src/schemas/post.schema";
import { TCategory, TPost, TUser } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@nextui-org/switch";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TProps = {
  prevPostData: TPost;
  categories: TCategory[];
};

const UpdatePost = ({ categories, prevPostData }: TProps) => {
  const isUserVerified = (prevPostData?.user as TUser)?.isVerified || false;
  const [isPremium, setIsPremium] = useState(prevPostData?.isPremium || false);
  const { mutate: handleUpdatePost, isLoading, isSuccess } = useUpdatePost();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnURL = searchParams.get("redirect") || "/";

  const categoriesOptions: TSelectOption[] =
    (
      categories &&
      categories?.map((category) => ({
        label: category?.name,
        key: category?._id,
      }))
    )?.sort((a, b) => a.label.localeCompare(b.label)) || [];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const changedData: Partial<TPost> = {};
    // Check for changed values
    if (data.title !== prevPostData?.title) {
      changedData.title = data.title;
    }
    if (data.category !== (prevPostData?.category as TCategory)?._id) {
      changedData.category = data.category;
    }
    if (data.description !== prevPostData?.description) {
      changedData.description = data.description;
    }
    if (isPremium !== prevPostData?.isPremium) {
      changedData.isPremium = isPremium;
    }
    handleUpdatePost({
      payload: changedData,
      postId: prevPostData?._id.toString(),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      //   router.replace()
      router.push(returnURL);
    }
  }, [isSuccess]);

  const methods = useForm({
    defaultValues: {
      title: prevPostData?.title,
      category: (prevPostData?.category as TCategory)._id || "",
      description: prevPostData?.description,
    },
    resolver: zodResolver(updatePostSchema),
  });

  return (
    <div className="container max-w-3xl mx-auto mt-4 px-10">
      <div className="mb-6">
        <h1 className="text-2xl mb-3 font-bold tracking-wide">Update Post</h1>
        <p>
          Previous Title : <strong>{prevPostData?.title}</strong>
        </p>
        <p>
          Previous Category :{" "}
          <strong>{(prevPostData?.category as TCategory).name}</strong>
        </p>
        <p>
          Previous Status :{" "}
          <strong>{prevPostData?.isPremium ? "Premium" : "Non Premium"}</strong>
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid sm:grid-cols-2 gap-x-6 gap-y-8"
        >
          <PPInput label="Title" name="title" type="text" variant="bordered" />
          <PPSelect
            label="Category"
            name="category"
            variant="bordered"
            options={categoriesOptions}
          />

          <PPTextEditor
            name="description"
            label="Description"
            className="col-span-1 sm:col-span-2"
          />
          <Tooltip
            content={
              !isUserVerified &&
              "Non verified user cannot modify premium status"
            }
            color={"danger"}
            placement="top-start"
            closeDelay={50}
            isDisabled={isUserVerified}
          >
            <div
              className={`mt-14 lg:mt-16 flex items-center space-x-4 w-fit sm:col-span-2 ${
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

          <div className="sm:col-span-2 -mt-6">
            <PPButton
              buttonText="Update Post"
              className="mt-8"
              isLoading={isLoading}
              isDisabled={
                !methods.formState.isDirty &&
                prevPostData?.isPremium === isPremium
              }
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdatePost;
