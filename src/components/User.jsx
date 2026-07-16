import { useState } from "react";

const User = ({ name, location }) => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(1);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-700 bg-[#171a21] p-5 text-gray-300 transition duration-300 hover:border-gray-600 hover:bg-[#1d222b]">
      <h1 className="text-lg font-semibold text-white">Count: {count}</h1>

      <h1 className="text-lg font-semibold text-white">Count2: {count2}</h1>

      <h1 className="text-xl font-bold text-amber-400">Name: {name}</h1>

      <p className="text-gray-400">📍 Location: {location}</p>

      <h4 className="text-sm text-gray-500">Contact: @Ksakshi</h4>
    </div>
  );
};

export default User;
