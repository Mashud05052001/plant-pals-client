import FilterSkeleton from "@/src/components/shekeleton/FilterSkeleton";
import SinglePostLoadingSkeleton from "@/src/components/shekeleton/SinglePostLoadingSkeleton";

const Loading = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6 mb-8">
        <FilterSkeleton />
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="pb-4">
            <SinglePostLoadingSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
