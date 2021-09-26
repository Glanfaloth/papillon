import React, { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Lobby() {
  return (
    <div className="shadow-xl bg-white p-4 md:p-8 rounded-xl	">
      <h1>Waiting for other players...</h1>
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
