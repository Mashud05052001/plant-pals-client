const CommentsSkeleton = () => {
  return (
    <div className="p-4">
      <div className="space-y-4 mb-10">
        <div className="w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-md" />
        <div className="w-24 h-8 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <div className="mb-4">
        {[1, 2, 3, 4].map((_, index) => (
          <div key={index} className="flex space-x-5 mb-4 animate-pulse ">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="flex flex-col space-y-2 w-full">
              <div className="w-24 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSkeleton;
