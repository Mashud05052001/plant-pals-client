const ProfileTabsSkeleton = () => {
  return (
    <div className="mt-6">
      <div className="flex space-x-2">
        <div className="animate-pulse bg-gray-200 h-8 w-[9.5rem] rounded-lg" />
        <div className="animate-pulse bg-gray-200 h-8 w-40 rounded-lg" />
        <div className="animate-pulse bg-gray-200 h-8 w-[12.7rem] rounded-lg" />
      </div>
    </div>
  );
};

export default ProfileTabsSkeleton;
