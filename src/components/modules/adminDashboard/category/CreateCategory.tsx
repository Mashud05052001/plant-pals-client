"use client";

import PPButton from "@/src/components/UI/button/PPButton";
import { useCreateCategory } from "@/src/hooks/category.mutate.hook";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const {
    mutate: handleCreateCategory,
    isLoading: createCategoryLoading,
    isSuccess: createCategorySuccess,
  } = useCreateCategory();
  const handleAdd = () => {
    const confirm = window.confirm(
      `Are you sure to add ${categoryName} as a category?`
    );
    if (confirm) {
      handleCreateCategory({ name: categoryName });
    }
  };
  useEffect(() => {
    if (createCategorySuccess) {
      setCategoryName("");
    }
  }, [createCategorySuccess]);
  return (
    <div>
      <h1 className="text-xl mb-4"> Create A Category </h1>
      <div className="ml-6  space-y-3">
        <Input
          size="md"
          variant="bordered"
          label="Enter Category Name"
          className="w-80"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <PPButton
          buttonText="Create"
          buttonType="button"
          size="md"
          className="px-5"
          isDisabled={categoryName === ""}
          isLoading={createCategoryLoading}
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

export default CreateCategory;
