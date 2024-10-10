const Loading = () => {
  return (
    <div className="mx-2 xl:mx-0">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-10 text-center animate-pulse">
          Performance Snapshot
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-200 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="animate-pulse bg-gray-300 h-12 w-12 rounded-full" />
            <p className="text-lg font-semibold text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
            <p className="text-2xl text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="animate-pulse bg-gray-300 h-12 w-12 rounded-full" />
            <p className="text-lg font-semibold text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
            <p className="text-2xl text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="animate-pulse bg-gray-300 h-12 w-12 rounded-full" />
            <p className="text-lg font-semibold text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
            <p className="text-2xl text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
          </div>
          <div className="bg-gray-200 shadow-md rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="animate-pulse bg-gray-300 h-12 w-12 rounded-full" />
            <p className="text-lg font-semibold text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
            <p className="text-2xl text-gray-500 animate-pulse bg-gray-200 h-6 w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
