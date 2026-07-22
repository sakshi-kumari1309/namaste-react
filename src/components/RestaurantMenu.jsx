import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import {
  MENU_ITEM_IMAGES,
  MENU_RESTAURANT_IMAGES,
  FALLBACK_MENU_IMG,
} from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [expandIndex, setExpandIndex] = useState(null);

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const info = resInfo?.cards?.[2]?.card?.card?.info;

  const resName = info?.name;
  const resCuisines = info?.cuisines?.join(", ");
  const resCostForTwo = info?.costForTwoMessage;
  const resRating = info?.avgRatingString;
  const resTotalRatings = info?.totalRatingsString;
  const resDeliveryTime = info?.sla?.slaString;

  const resBannerImg = MENU_RESTAURANT_IMAGES[resId] || FALLBACK_MENU_IMG;

  const menuCategories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory",
    ) || [];

  return (
    <div className="bg-[#0f111a] mx-auto max-w-5xl px-4 py-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          {info.name}
        </h2>

        <p className="mt-4 text-lg md:text-xl font-medium text-gray-300">
          {resCuisines} • {resCostForTwo}
        </p>
      </div>

      {menuCategories.map((category, index) => {
        const categoryData = category.card.card;
        console.log("categoryData:", categoryData);
        return (

          // Controlled Component approach
          <RestaurantCategory
            key={categoryData.title}
            categoryData={categoryData}
            showItem={index === expandIndex ? true : false}
            setExpandIndex={() => setExpandIndex(index)}
          />
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
