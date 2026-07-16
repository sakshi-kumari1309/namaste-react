import React from "react";

const Shimmer = () => {
  const placeholders = Array.from({ length: 8 });

  return (
    <div className="mx-auto mt-6 grid max-w-[1400px] grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 px-4">
      {placeholders.map((_, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-2xl border border-gray-700 bg-[#171a21] animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="h-52 w-full bg-gray-700/40"></div>

          {/* Content */}
          <div className="space-y-3 p-4">
            <div className="h-5 w-3/4 rounded bg-gray-700/40"></div>

            <div className="h-4 w-full rounded bg-gray-700/30"></div>

            <div className="h-4 w-5/6 rounded bg-gray-700/30"></div>

            <div className="h-4 w-2/5 rounded bg-gray-700/30"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
