const FilterSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 gap-y-6 sm:gap-y-0 mx-4 md:mx-0">
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
