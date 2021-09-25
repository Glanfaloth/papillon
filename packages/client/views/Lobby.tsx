import React, { useEffect } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Lobby() {
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <h1>Matching you with other players...</h1>
      <div className=" transform -translate-x-5">
        <div className="m-10 flex justify-center items-center fill-current animate-spin ">
          <AiOutlineLoading style={{ width: 50, height: 50 }} />
        </div>
      </div>
    </div>
  );
}
