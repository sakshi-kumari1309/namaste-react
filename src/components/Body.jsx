import RestaurantCard from "./RestaurantCard.jsx";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer.jsx";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  //* milliseconds to keep the shimmer visible
  const SIMULATED_DELAY_MS = 1500;

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    const response = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );

    const json = await response.json();

    const restaurants =
      json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    //* artificial delay so shimmer is visible during development
    await new Promise((res) => setTimeout(res, SIMULATED_DELAY_MS));

    setListOfRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  };

  return filteredRestaurants.length === 0 ? (
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
            setFilteredRestaurants(filteredList);
          }}
        >
          ⭐ Top Rated Restaurants
        </button>

        <div className="search">
          <input
            type="text"
            placeholder="Search Restaurants..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              //* filter the list of restaurants based on the search text
              console.log(searchText);
              const filteredList = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Search
          </button>
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
        {filteredRestaurants.length > 0
          ? filteredRestaurants.map((restaurant) => (
              // key must be unique — using the API's own id field
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            ))
          : listOfRestaurants.map((restaurant) => (
              // key must be unique — using the API's own id field
              <RestaurantCard key={restaurant.info.id} resData={restaurant} />
            ))}
      </div>
    </div>
  );
};

export default Body;
