import SinglePostLoadingSkeleton from "./SinglePostLoadingSkeleton";

const ProfileFavouritesPostSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="grid mt-2 grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx}>
            <SinglePostLoadingSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFavouritesPostSkeleton;
