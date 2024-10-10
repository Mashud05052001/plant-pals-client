const FilterSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-6 md:gap-y-0">
      <div>
        <div className="animate-pulse">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>

      <div>
        <div className="animate-pulse">
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mb-2" />
        </div>
      </div>
    </div>
  );
};

export default FilterSkeleton;
