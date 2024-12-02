"use client";

import PPButton from "@/src/components/UI/button/PPButton";
import { useUpdateCategory } from "@/src/hooks/category.mutate.hook";
import { TCategory } from "@/src/types";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useState } from "react";

const UpdateCategory = ({ categories }: { categories: TCategory[] }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const {
    mutate: handleUpdateCategory,
    isLoading: updateCategoryLoading,
    isSuccess: updateCategorySuccess,
  } = useUpdateCategory();

  const handleUpdate = () => {
    const confirm = window.confirm(
      `Are you sure you want to update the category to ${newCategoryName}?`
    );
    if (confirm) {
      const updatedData = {
        payload: { name: newCategoryName },
        categoryId: selectedCategoryId,
      };
      console.log(updatedData);
      handleUpdateCategory(updatedData);
    }
  };

  useEffect(() => {
    if (updateCategorySuccess) {
      setSelectedCategoryId("");
      setNewCategoryName("");
    }
  }, [updateCategorySuccess]);

  return (
    <div>
      <h1 className="text-xl mb-4"> Update Category </h1>
      <div className="ml-6 space-y-4">
        <Select
          label="Select Existing Category"
          placeholder="Select a category"
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-80"
          value={selectedCategoryId}
        >
          {categories.map((category) => (
            <SelectItem key={category?._id} value={category?.name}>
              {category?.name}
            </SelectItem>
          ))}
        </Select>

        <Input
          size="md"
          variant="bordered"
          label="Enter New Category Name"
          className="w-80"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />

        <PPButton
          buttonText="Update"
          buttonType="button"
          size="md"
          className="px-5"
          isDisabled={!selectedCategoryId || newCategoryName === ""}
          isLoading={updateCategoryLoading}
          onClick={handleUpdate}
        />
      </div>
    </div>
  );
};

export default UpdateCategory;
