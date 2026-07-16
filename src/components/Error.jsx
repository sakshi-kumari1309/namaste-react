import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  console.log(error);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-6xl font-extrabold text-red-500">Oops!!!</h1>

      <p className="mb-2 text-2xl font-semibold text-white">
        Something went wrong.
      </p>

      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-3 text-lg text-red-300">
        {error?.status} : {error?.statusText}
      </p>
    </div>
  );
};

export default Error;
