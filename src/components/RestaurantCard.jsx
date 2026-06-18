import restaurantImages from "../utils/images";

const RestaurantCard = ({ resData }) => {
  const {
    id,
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    deliveryTime,
  } = resData.info;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt={name}
        src={
          restaurantImages[id] ||
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        }
      />

      <h3>{name}</h3>

      <h4>
        {cuisines.length > 3
          ? cuisines.slice(0, 3).join(", ") + "..."
          : cuisines.join(", ")}
      </h4>

      <h4>⭐ {avgRating}</h4>

      <h4>💰 ₹{costForTwo / 100} FOR TWO</h4>

      <h4>🚚 {deliveryTime} mins</h4>
    </div>
  );
};

export default RestaurantCard;