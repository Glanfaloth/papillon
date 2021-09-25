import React, { useEffect } from "react";

export default function Lobby() {
  return (
    <div className="bg-gradient-to-r from-green-200 to-blue-300 overflow-hidden">
      <div className="shadow-lg rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 p-8 text-white">
        <h1>Waiting for other players...</h1>
        <div className="fill-current bg-red-600  animate-spin h-5 w-5 mr-3">
          <svg className="" viewBox="0 0 24 24"></svg>
        </div>
      </div>
    </div>
  );
}
