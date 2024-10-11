const TableSkeleton = ({ loadingTxt = "Loading" }: { loadingTxt?: string }) => {
  return (
    <div className="min-h-screen flex flex-col px-4">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          {loadingTxt} Data...
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Please wait while we are getting your content.
        </p>
      </div>
      {/* Skeleton for posts */}
      <div className="mt-8 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              <div className="h-6 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
