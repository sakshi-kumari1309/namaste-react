import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext.js";

const Body = () => {
  const SIMULATED_DELAY_MS = 1500;

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const { loggedInUser, setUserName } = useContext(UserContext);

  const RestaurantCardWithPromoted = withPromotedLabel(RestaurantCard);

  const fetchData = async () => {
    const response = await fetch(
      "https://namastedev.com/api/v1/listRestaurants",
    );

    const json = await response.json();

    const restaurants =
      json?.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    await new Promise((res) => setTimeout(res, SIMULATED_DELAY_MS));

    setListOfRestaurants(restaurants);
  };

  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-2 text-3xl font-bold text-red-500">
          You are offline
        </h2>

        <p className="text-gray-400">Please check your internet connection.</p>
      </div>
    );
  }

  const restaurantsToShow =
    filteredRestaurants.length > 0 ? filteredRestaurants : listOfRestaurants;

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-10">
      {/* Search */}
      <div className="mx-auto mb-12 flex max-w-2xl gap-3 max-md:flex-col">
        <input
          type="text"
          placeholder="Search for restaurants or dishes"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 rounded-xl border border-gray-700 bg-[#171a21] px-5 py-3.5 text-white outline-none transition focus:border-amber-400"
        />

        <button
          className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-gray-900 transition hover:bg-amber-500 max-md:w-full"
          onClick={() => {
            const filteredList = listOfRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchText.toLowerCase()),
            );

            setFilteredRestaurants(filteredList);
          }}
        >
          Search
        </button>

        <input
        className="flex-1 rounded-xl border border-gray-700 bg-[#171a21] px-5 py-3.5 text-white outline-none transition focus:border-amber-400"
          value={loggedInUser}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      {/* Filter */}
      <div className="mx-auto mb-6 flex max-w-[1400px]">
        <button
          className="cursor-pointer rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-3 font-semibold text-amber-400 transition hover:border-amber-400/60 hover:bg-amber-400/20 hover:text-white active:scale-95 max-md:w-full"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (restaurant) => restaurant.info.avgRating > 4.5,
            );

            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-md:grid-cols-1">
        {restaurantsToShow.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={`/restaurant/${restaurant.info.id}`}
            className="block text-inherit no-underline"
          >
            {restaurant.info.promoted ? (
              <RestaurantCardWithPromoted resData={restaurant.info} />
            ) : (
              <RestaurantCard resData={restaurant.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
