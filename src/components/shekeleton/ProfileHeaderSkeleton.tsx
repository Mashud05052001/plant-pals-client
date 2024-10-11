const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex gap-x-10 flex-col md:flex-row space-y-4 items-center select-none">
      <div className="relative w-44 h-44 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700">
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>
      <div className="space-y-4">
        <div className="space-y-1 flex flex-col md:flex-row items-center md:items-end md:space-x-12 justify-center">
          <div className="relative">
            <div className="flex items-center space-x-3">
              <div className="flex items-end animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-60 rounded" />
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-8 rounded-full" />
            </div>
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-40 rounded mt-2" />
            <div className="mt-2 animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-full rounded" />
          </div>
          <div className="space-y-2">
            <div className="flex space-x-4">
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded flex items-center space-x-1">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded-full" />
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-16 rounded" />
              </div>
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-6 w-20 rounded flex items-center space-x-2">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded-full" />
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-16 rounded" />
              </div>
            </div>
            <div className="flex space-x-8">
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-12 rounded" />
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-16 rounded flex items-center space-x-1">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded-full" />
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-12 rounded" />
              </div>
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-5 w-16 rounded flex items-center space-x-1">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-4 rounded-full" />
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-12 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderSkeleton;
