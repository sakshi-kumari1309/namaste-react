import React, { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ categoryData, showItem, setExpandIndex }) => {

  const handleClick = () => {
    setExpandIndex();
  };

  return (
    <div
      key={categoryData.title}
      className="items-center gap-5 border-b border-gray-700 py-5 last:border-none"
    >
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="mb-1 truncate text-base font-bold text-white">
          {categoryData.title} ({categoryData.itemCards.length})
        </span>
        <span>⬇️</span>
      </div>
      {showItem && <ItemList items={categoryData.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
