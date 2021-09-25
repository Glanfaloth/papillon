import React, { useEffect } from "react";

export default function Lobby() {
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <h1>Waiting for other players</h1>
      <div className=" transform -translate-x-5">
        <div className="m-10 flex-row space-x-3 justify-center items-center mr-0">
          <div className="w-3 h-3 bg-black animate-rotate0"></div>
          <div className="w-3 h-3 bg-black animate-rotate1"></div>
          <div className="w-3 h-3 bg-black animate-rotate2"></div>
        </div>
      </div>
    </div>
  );
}
