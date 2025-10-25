import React from "react";
import usePeerContext from "../context/peer.context";

function GameBoard() {
  const { tiles, loading } = usePeerContext();
  const HandleSubmit = (event) => {
    event.preventDefault();
  };
  console.log(tiles);

  return (
    <>
      {" "}
      <div className="flex flex-col items-center gap-10 py-3 md:flex-row md:py-6">
        <div className="w-full flex-auto md:max-w-1/2">
          <div className="h-16 w-full rounded-xl border-b-8 border-b-indigo-950 bg-indigo-900">
            <div className="flex h-full items-center justify-center gap-2 text-xl font-semibold">
              <span className="text-cyan-300">SPARTAN</span>
              <span className="text-white">VS</span>
              <span className="text-pink-300">GOHAN</span>
            </div>
          </div>
          <div className="mt-5">
            <div className="rounded-xl bg-indigo-900 px-4 py-8 font-baloo">
              <div className="grid grid-cols-3 gap-5">
                {
                  tiles.map((item) => (
                    <button className="bg-indigo-400/40 aspect-square rounded-lg shadow-blue-950/65 shadow-[0px_0.4rem]">
                      <span className="font-semibold text-6xl">{item.id}</span>
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-auto md:max-w-1/2"></div>
      </div>
      <div className="mx-auto w-full max-w-xs p-3 md:max-w-sm md:p-5">
        <form
          onSubmit={HandleSubmit}
          className="input-border grid w-full grid-cols-3 gap-5 rounded-2xl bg-indigo-950 p-5 md:p-8"
        >
          {tiles.map((item) => (
            <button
              className="gridbox-center aspect-square rounded-xl bg-indigo-900"
              key={item.id}
            >
              <span className="text-3xl font-semibold text-indigo-300/10">
                {item.id}
              </span>
            </button>
          ))}
        </form>
      </div>
    </>
  );
}

export default GameBoard;
