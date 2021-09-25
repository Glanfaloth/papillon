import React, { useEffect } from "react";

export default function Lobby() {
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <h1>Waiting for other players</h1>
      <div className=" transform -translate-x-5">
        <div className="m-10 flex justify-center items-center fill-current bg-red-600 animate-spin h-5 w-5 mr-3">
          <svg className="" viewBox="0 0 50 50"></svg>
        </div>
      </div>
    </div>
  );
}
