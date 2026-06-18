import RestaurantCard from "./RestaurantCard.jsx";
import resList from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);

  return (
    <div className="body">
      <div className="filter-search-container">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (item) => item.data.avgRating > 4,
            );
            setListOfRestaurants(filteredList);
          }}
        >
          ⭐ Top Rated Restaurants
        </button>

        <div className="search">
          <input
            type="text"
            placeholder="Search Restaurants..."
            className="search-input"
          />

          <button className="search-btn">Search</button>
        </div>
      </div>

      <h2
        style={{
          marginLeft: "40px",
          marginBottom: "20px",
        }}
      >
        Top Restaurants Near You 🍔
      </h2>

      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.data.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
