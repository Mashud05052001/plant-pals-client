// import modules from "./gallery.module.css";

export default function Loading() {
  const getRandomHeightClass = () => {
    const heights = ["h-48", "h-64", "h-80", "h-96", "h-68", "h-72"];
    return heights[Math.floor(Math.random() * heights.length)];
  };
  return (
    // <div className={` ${modules.skeletonBox}`}>
    <div className="skeletonBox">
      {/* Display 8 skeleton blocks while loading */}
      {Array.from({ length: 15 }).map((_, idx) => (
        <div
          key={idx}
          className={` w-full 
                ${getRandomHeightClass()}            
            bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse my-4`}
        />
      ))}
    </div>
  );
}
