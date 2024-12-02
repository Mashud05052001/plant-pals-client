import CreateCategory from "@/src/components/modules/adminDashboard/category/CreateCategory";
import DeleteCategory from "@/src/components/modules/adminDashboard/category/DeleteCategory";
import UpdateCategory from "@/src/components/modules/adminDashboard/category/UpdateCategory";
import { useGetCategoriesServerSide } from "@/src/hooks/category.serverFetch.hook";

const Page = async () => {
  const categories = await useGetCategoriesServerSide();
  const categoryMessage = categories?.map((item) => item?.name).join(", ");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        {categories?.length === 0 ? (
          <h3 className="text-2xl font-semibold">No categories exist</h3>
        ) : (
          <div className="flex space-x-4 items-center text-lg">
            <h4 className="">All Categories:</h4>
            <p className="flex-grow text-justify">
              <strong>{categoryMessage}.</strong>
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 mt-10">
        <div className="flex flex-col space-y-10 ">
          <CreateCategory />
          <div className="hidden md:block">
            <DeleteCategory categories={categories} />
          </div>
        </div>
        <div className="flex flex-col">
          <UpdateCategory categories={categories} />
        </div>
        <div className="flex flex-col md:hidden">
          <DeleteCategory categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Page;
