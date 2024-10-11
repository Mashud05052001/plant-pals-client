const UpdatePostSkeleton = () => {
  return (
    <div className="container max-w-4xl mx-auto px-10 py-8 rounded-lg dark:bg-gray-800">
      <div className="mb-6">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-1/2 rounded mb-3" />
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-1/4 rounded mb-2" />
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-1/4 rounded mb-2" />
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-1/4 rounded" />
      </div>
      <form className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-full rounded" />
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-full rounded" />
        <div className="col-span-1 sm:col-span-2">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-44 w-full rounded" />
        </div>
        <div className="-mt-10 lg:mt-16 flex items-center space-x-4 w-fit sm:col-span-2">
          <div className="font-medium flex space-x-4">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-40 rounded mb-1" />
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-16 rounded" />
          </div>
        </div>
        <div className="sm:col-span-2 -mt-6">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-32 rounded mt-8" />
        </div>
      </form>
    </div>
  );
};

export default UpdatePostSkeleton;
