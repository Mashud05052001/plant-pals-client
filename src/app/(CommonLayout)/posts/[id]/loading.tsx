import SinglePostLoadingSkeleton from "@/src/components/shekeleton/SinglePostLoadingSkeleton";

const Loading = () => {
  return (
    <div className="max-w-2xl mx-auto -mt-8">
      <SinglePostLoadingSkeleton withComments={true} />
    </div>
  );
};

export default Loading;
