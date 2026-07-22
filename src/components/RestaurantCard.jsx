import React, { useContext } from "react";
import { RESTAURANT_IMAGES, FALLBACK_IMG } from "../utils/constants";
import UserContext from "../utils/UserContext.js";

const RestaurantCard = ({ resData }) => {
  const {
    id,
    name,
    cuisines,
    avgRatingString,
    sla,
    costForTwo,
    locality,
    areaName,
    veg,
    aggregatedDiscountInfoV3,
  } = resData;

  const imgSrc = RESTAURANT_IMAGES[id] ?? FALLBACK_IMG;
  const { loggedInUser } = useContext(UserContext);

  return (
    <div className="relative cursor-pointer overflow-hidden rounded-2xl border border-gray-700 bg-[#171a21] transition duration-300 hover:-translate-y-1.5 hover:border-gray-600 hover:bg-[#1d222b]">
      {/* Discount Badge */}
      {aggregatedDiscountInfoV3 && (
        <div className="absolute left-3.5 top-3.5 z-10 flex flex-col rounded-lg bg-black/75 px-3 py-2 backdrop-blur-md">
          <span className="text-sm font-bold text-white">
            {aggregatedDiscountInfoV3.header}
          </span>
          <span className="text-xs text-amber-400">
            {aggregatedDiscountInfoV3.subHeader}
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative">
        <img
          src={imgSrc}
          alt={name}
          className="h-[200px] w-full object-cover"
        />

        {veg && (
          <span className="absolute bottom-3 right-3 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
            🟢 Pure Veg
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold text-white">{name}</h3>

        <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-400">
          {cuisines.join(", ")}
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-green-500">
            ⭐ {avgRatingString}
          </span>

          <span className="text-gray-600">•</span>

          <span className="text-gray-400">{sla.slaString}</span>

          <span className="text-gray-600">•</span>

          <span className="text-gray-400">{costForTwo}</span>
        </div>

        <p className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-sm text-amber-400">
          📍 {locality}, {areaName}
        </p>
        <div className="text-gray-400 my-2">User: {loggedInUser}</div>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <RestaurantCard {...props} />
        <span className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
          PROMOTED
        </span>
      </div>
    );
  };
};

export default RestaurantCard;
