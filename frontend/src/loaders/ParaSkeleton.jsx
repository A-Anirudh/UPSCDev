import React from "react";

export const ParaSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="loader py-5 w-full rounded"></p>
      <p className="loader py-2 w-3/4 rounded"></p>
      <p className="loader py-2 w-1/2 rounded"></p>
      <p className="loader py-2 w-1/4 rounded"></p>
    </div>
  );
};
