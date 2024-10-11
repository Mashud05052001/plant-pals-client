import CommentsSkeleton from "./CommentsSkeleton";

const SinglePostLoadingSkeleton = ({
  withComments = false,
}: {
  withComments?: boolean;
}) => {
  return (
    <div className="p-4 border dark:border-black rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />

          <div className="space-y-1">
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          </div>
        </div>

        <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="w-48 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        <div className="w-32 h-3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      </div>

      <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-4" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
        </div>
        <div className="flex space-x-6">
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
        </div>
      </div>
      {withComments && (
        <div className="-mx-3.5">
          <CommentsSkeleton />
        </div>
      )}
    </div>
  );
};

export default SinglePostLoadingSkeleton;
