import SinglePostLoadingSkeleton from "@/src/components/shekeleton/SinglePostLoadingSkeleton";

const Loading = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <SinglePostLoadingSkeleton withComments={true} />
    </div>
  );
};

export default Loading;
