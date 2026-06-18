import RestaurantCard from "./RestaurantCard.jsx";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer.jsx";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  //* milliseconds to keep the shimmer visible
  const SIMULATED_DELAY_MS = 1500;

  const fetchData = async () => {
    const response = await fetch(
      "https://namastedev.com/api/v1/listRestaurants",
    );

    const json = await response.json();

    const restaurants =
      json?.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    //* artificial delay so shimmer is visible during development
    await new Promise((res) => setTimeout(res, SIMULATED_DELAY_MS));

    setListOfRestaurants(restaurants);
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter-search-container">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (item) => item.info.avgRating > 4,
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
          <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
