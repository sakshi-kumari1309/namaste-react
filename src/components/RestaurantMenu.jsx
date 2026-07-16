import React from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import {
  MENU_ITEM_IMAGES,
  MENU_RESTAURANT_IMAGES,
  FALLBACK_MENU_IMG,
} from "../utils/constants";

const RestaurantMenu = () => {
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
    <div className="mx-auto max-w-4xl pb-20">
      {/* Banner */}
      <img
        src={resBannerImg}
        alt={resName}
        className="mx-8 mt-6 h-60 w-[calc(100%-4rem)] rounded-2xl border border-gray-700 object-cover object-[center_30%]
                   md:mx-5 md:mt-4 md:h-52 md:w-[calc(100%-2.5rem)]
                   sm:mx-4 sm:mt-3 sm:h-40 sm:w-[calc(100%-2rem)]"
      />

      {/* Restaurant Info */}
      <div className="border-b border-gray-700 px-8 py-7 md:px-5">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white md:text-2xl">
          {resName}
        </h1>

        <p className="mb-4 text-sm text-gray-400">{resCuisines}</p>

        <p className="inline-flex items-center gap-2 rounded-full border border-gray-700 bg-[#171a21] px-4 py-2 text-sm text-gray-400">
          ⭐ {resRating} ({resTotalRatings}) • {resCostForTwo} • 🕐{" "}
          {resDeliveryTime}
        </p>
      </div>

      {/* Heading */}
      <h2 className="px-8 pt-6 text-xs font-bold uppercase tracking-widest text-gray-400 md:px-5">
        Menu
      </h2>

      {/* Categories */}
      {menuCategories.map((category) => {
        const { title, itemCards } = category.card.card;

        return (
          <div key={title} className="mb-2 px-8 md:px-5">
            <h3 className="border-b border-gray-700 py-5 text-lg font-bold text-white">
              {title}
            </h3>

            <ul>
              {itemCards.map(({ card }) => {
                const { id, name, description, price, defaultPrice } =
                  card.info;

                const displayPrice = (price || defaultPrice) / 100;

                const imgSrc = MENU_ITEM_IMAGES[id] || FALLBACK_MENU_IMG;

                return (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-5 border-b border-gray-700 py-5 last:border-none"
                  >
                    {/* Left */}
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-1 truncate text-base font-bold text-white">
                        {name}
                      </h4>

                      <p className="mb-3 line-clamp-2 text-sm leading-6 text-gray-400">
                        {description}
                      </p>

                      <span className="text-base font-bold text-white">
                        ₹{displayPrice}
                      </span>
                    </div>

                    {/* Right */}
                    <img
                      src={imgSrc}
                      alt={name}
                      className="h-28 w-28 flex-shrink-0 rounded-xl border border-gray-700 object-cover
                                 md:h-20 md:w-20
                                 sm:h-[72px] sm:w-[72px]"
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
