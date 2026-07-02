import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ← add this
import Shimmer from "./Shimmer";
import {
  MENU_ITEM_IMAGES,
  MENU_RESTAURANT_IMAGES,
  FALLBACK_MENU_IMG,
} from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams(); // ← reads :resId from the URL
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]); // ← re-fetch if resId changes

  const fetchMenu = async () => {
    const response = await fetch(
      `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`,
    );
    const json = await response.json();
    console.log("Menu Data:", json);
    setResInfo(json.data);
  };

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
  //*
  console.log("Menu Categories:", menuCategories);

  return (
    <div className="menu">
      <img className="restaurant-banner" src={resBannerImg} alt={resName} />

      <div className="restaurant-info">
        <h1>{resName}</h1>
        <p className="cuisines">{resCuisines}</p>
        <p className="meta">
          ⭐ {resRating} ({resTotalRatings}) • {resCostForTwo} • 🕐{" "}
          {resDeliveryTime}
        </p>
      </div>

      <h2 className="menu-heading">Menu</h2>

      {menuCategories.map((category) => {
        const { title, itemCards } = category.card.card;
        return (
          <div key={title} className="menu-category">
            <h3 className="category-title">{title}</h3>
            <ul className="item-list">
              {itemCards.map(({ card }) => {
                const { id, name, description, price, defaultPrice } =
                  card.info;
                const displayPrice = (price || defaultPrice) / 100;
                const imgSrc = MENU_ITEM_IMAGES[id] || FALLBACK_MENU_IMG;
                return (
                  <li key={id} className="menu-item">
                    <div className="item-details">
                      <h4 className="item-name">{name}</h4>
                      <p className="item-description">{description}</p>
                      <span className="item-price">₹{displayPrice}</span>
                    </div>
                    <img className="item-img" src={imgSrc} alt={name} />
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