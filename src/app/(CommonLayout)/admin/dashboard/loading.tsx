const Loading = () => {
  return (
    <div className="px-6">
      <div className="space-y-8 mt-6 ">
        <div className="animate-pulse">
          <p className="pl-8 font-semibold mb-2 bg-gray-300 h-6 w-1/3 rounded" />
        </div>
        <div className="animate-pulse">
          <p className="pl-8 font-semibold mb-2 bg-gray-300 h-6 w-1/3 rounded" />
          <div className="bg-gray-200 h-64 rounded-lg" />
        </div>
        <div className="animate-pulse">
          <p className="pl-8 font-semibold mb-2 bg-gray-300 h-6 w-1/3 rounded" />
          <div className="bg-gray-200 h-64 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
