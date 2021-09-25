import React, { useEffect } from "react";

export default function Lobby() {
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-4/5	">
      <h1>Waiting for other players...</h1>
      <div className="fill-current bg-red-600  animate-spin h-5 w-5 mr-3">
        <svg className="" viewBox="0 0 24 24"></svg>
      </div>
    </div>
  );
}
