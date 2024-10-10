const TableSkeleton = ({ loadingTxt = "Loading" }: { loadingTxt?: string }) => {
  return (
    <div className="min-h-screen flex flex-col px-4 bg-gray-50">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {loadingTxt} Data...
        </h2>
        <p className="text-lg text-gray-600">
          Please wait while we getting your content.
        </p>
      </div>
      {/* Skeleton for posts */}
      <div className="mt-8 space-y-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex items-center justify-between bg-white p-4 shadow rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gray-200 rounded-lg" />
              <div className="h-6 w-40 bg-gray-200 rounded-lg" />
            </div>
            <div className="flex gap-4">
              <div className="h-6 w-8 bg-gray-200 rounded-lg" />
              <div className="h-6 w-8 bg-gray-200 rounded-lg" />
              <div className="h-6 w-8 bg-gray-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
