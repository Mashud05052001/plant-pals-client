"use client";

import PPButton from "@/src/components/UI/button/PPButton";
import {
  useDeleteAllCategories,
  useDeleteSingleCategory,
} from "@/src/hooks/category.mutate.hook";
import { TCategory } from "@/src/types";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";

const DeleteCategory = ({ categories }: { categories: TCategory[] }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const {
    mutate: handleDeleteSingleCategory,
    isLoading: deleteSingleCategoryLoading,
    isSuccess: deleteSingleCategorySuccess,
  } = useDeleteSingleCategory();

  const {
    mutate: handleDeleteAllCategories,
    isLoading: deleteAllCategoriesLoading,
    isSuccess: deleteAllCategoriesSuccess,
  } = useDeleteAllCategories();

  const handleDeleteSingle = () => {
    const confirm = window.confirm(
      `Are you sure you want to delete the selected category?`
    );
    if (confirm && selectedCategoryId) {
      handleDeleteSingleCategory(selectedCategoryId);
    }
  };

  // const handleDeleteAll = () => {
  //   const confirm = window.confirm(
  //     `Are you sure you want to delete all categories?`
  //   );
  //   if (confirm) {
  //     handleDeleteAllCategories();
  //   }
  // };

  // useEffect(() => {
  //   if (deleteSingleCategorySuccess) {
  //     setSelectedCategoryId("");
  //   }
  // }, [deleteSingleCategorySuccess]);

  return (
    <div>
      <h1 className="text-xl mb-4"> Delete Category </h1>
      <div className="ml-6 space-y-4">
        <div className="ml- space-y-4 flex flex-col w-fit">
          <Select
            label="Select Category to Delete"
            placeholder="Select a category"
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="w-80"
            value={selectedCategoryId}
          >
            {categories.map((category) => (
              <SelectItem key={category?._id} value={category?._id}>
                {category?.name}
              </SelectItem>
            ))}
          </Select>

          <PPButton
            buttonText="Delete Selected Category"
            buttonType="button"
            size="md"
            className="px-5 w-fit"
            isDisabled={!selectedCategoryId}
            isLoading={deleteSingleCategoryLoading}
            onClick={handleDeleteSingle}
            color="danger"
          />

          {/* <PPButton
            buttonText="Delete All Categories"
            buttonType="button"
            size="md"
            className="px-5 w-fit"
            isDisabled={true}
            isLoading={deleteAllCategoriesLoading}
            onClick={handleDeleteAll}
            color="danger"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
