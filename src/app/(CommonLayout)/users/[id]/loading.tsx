import ProfileHeaderSkeleton from "@/src/components/shekeleton/ProfileHeaderSkeleton";
import ProfilePostLoadingSkeleton from "@/src/components/shekeleton/ProfilePostLoadingSkeleton";

const Loading = () => {
  return (
    <div>
      <ProfileHeaderSkeleton />
      <div className="mt-8">
        <div className="grid mt-2 grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx}>
              <ProfilePostLoadingSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
