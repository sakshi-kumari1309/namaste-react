import React from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { RESTAURANT_IMAGES, FALLBACK_IMG } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
  //* milliseconds to keep the shimmer visible
  const SIMULATED_DELAY_MS = 1500;

  //* Local State variable to hold the list of restaurants
  //* Whenever state varibale, react triggers a reconciliation cycle
  //* (re-render the whole component)

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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

  //* Conditional rendering based on the state of listOfRestaurants
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for restaurants or dishes"
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
      <div
        className="filter-btn"
        onClick={() => {
          const filteredList = listOfRestaurants.filter(
            (restaurant) => restaurant.info.avgRating > 4.5,
          );
          setFilteredRestaurants(filteredList);
        }}
      >
        <button>Top Rated Restaurants</button>
      </div>

      <div className="restaurant-list">
        {(filteredRestaurants.length > 0
          ? filteredRestaurants
          : listOfRestaurants
        ).map((restaurant) => (
          // ← Link wraps the card, id goes into the URL
          <Link
            key={restaurant.info.id}
            to={`/restaurant/${restaurant.info.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <RestaurantCard resData={restaurant.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;