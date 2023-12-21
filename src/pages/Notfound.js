import React from "react";

function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center homemessage bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>
  );
}

export default Notfound;
