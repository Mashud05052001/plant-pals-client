import ProfileHeaderSkeleton from "@/src/components/shekeleton/ProfileHeaderSkeleton";
import ProfilePostLoadingSkeleton from "@/src/components/shekeleton/ProfilePostLoadingSkeleton";
import ProfileTabsSkeleton from "@/src/components/shekeleton/ProfileTabsSkeleton";

export default function Loading() {
  return (
    <div className="px-5">
      <ProfileHeaderSkeleton />
      <ProfileTabsSkeleton />
      <div className="mt-6">
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
}
