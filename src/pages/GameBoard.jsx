import React from "react";
import usePeerContext from "../context/peer.context";

function GameBoard() {
  const { tile, loading } = usePeerContext();
  const HandleSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <div className="mx-auto w-full max-w-xs md:max-w-sm p-3 md:p-5">
      <form 
        onSubmit={HandleSubmit} 
        className="w-full grid grid-cols-3 gap-5 p-5 md:p-8 input-border bg-indigo-950 rounded-2xl">
            {
                tile.map((item) => (
                    <button className="button-border gridbox-center aspect-square bg-indigo-900 text-white rounded-xl">

                    </button>
                ))
            }
      </form>
    </div>
  );
}

export default GameBoard;
