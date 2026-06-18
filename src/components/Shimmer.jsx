import React from "react";

const Shimmer = () => {
  const placeholders = Array.from({ length: 8 });

  return (
    <div className="shimmer-container">
      {placeholders.map((_, idx) => (
        <div className="shimmer-card" key={idx}>
          <div className="shimmer-body">
            <div className="shimmer-line lg"></div>
            <div className="shimmer-line md"></div>
            <div className="shimmer-line sm"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;