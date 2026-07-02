import React from "react";
import { RESTAURANT_IMAGES, FALLBACK_IMG } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  // Destructure everything needed directly from resData
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

  return (
    <div className="restaurant-card">
      {/* Discount badge — only renders if the data exists */}
      {aggregatedDiscountInfoV3 && (
        <div className="discount-badge">
          <span className="discount-header">
            {aggregatedDiscountInfoV3.header}
          </span>
          <span className="discount-sub">
            {aggregatedDiscountInfoV3.subHeader}
          </span>
        </div>
      )}

      <div className="card-img-wrapper">
        <img src={imgSrc} alt={name} className="card-img" />
        {veg && <span className="veg-badge">🟢 Pure Veg</span>}
      </div>

      <div className="card-body">
        <h3 className="card-name">{name}</h3>
        <p className="card-cuisines">{cuisines.join(", ")}</p>

        <div className="card-meta">
          <span className="card-rating">⭐ {avgRatingString}</span>
          <span className="card-dot">·</span>
          <span className="card-time">{sla.slaString}</span>
          <span className="card-dot">·</span>
          <span className="card-cost">{costForTwo}</span>
        </div>

        <p className="card-location">
          📍 {locality}, {areaName}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;