import React, { useState } from "react";
import usePeerContext from "../context/peer.context";
import { turnColors } from "../constants/colors";

function GameBoard() {
  const { gameObject, username, Selection } = usePeerContext();
  const isMyTurn = gameObject[gameObject.turn] == username;
  const myLabel = gameObject.x == username ? 'x' : 'o';


  return (
    <>
      <div className="flex flex-col items-center gap-10 py-3 md:flex-row md:py-6">
        <div className="w-full flex-auto md:max-w-1/2">
          <div className="w-full rounded-xl border-b-8 border-b-indigo-950 bg-indigo-900 relative
            before:containt-[''] before:absolute before:block before:h-14 before:w-3 before:bg-indigo-400 before:rounded-lg before:left-8 before:-bottom-11 before:shadow-[0px_0.3rem] before:shadow-blue-950/90
            after:containt-[''] after:absolute after:block after:h-14 after:w-3 after:bg-indigo-400 after:rounded-lg after:right-8 after:-bottom-11 after:shadow-[0px_0.3rem] after:shadow-blue-950/90
          ">
            <div className="flex justify-evenly items-center py-5 uppercase">
              <div className="text-cyan-300 text-center">
                <p>{gameObject.x}</p>
                <span className="font-bold text-6xl">X</span>
              </div>
              <span className="text-white text-3xl font-semibold">VS</span>
              <div className="text-pink-300 text-center">
                <p>{gameObject.o}</p>
                <span className="font-bold text-6xl">O</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="rounded-xl bg-indigo-900 px-6 py-8 font-baloo">
              <div className="grid grid-cols-3 gap-5">
                {
                  gameObject?.tiles.map((item) => (
                    <button onClick={() => Selection(item.id)}
                      disabled={!isMyTurn || item.disabled}
                      className="bg-indigo-400/40 aspect-square rounded-lg shadow-blue-950 shadow-[0px_0.5rem] group cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-950 transition-colors">
                      {
                        item.selected ?
                          <span className={`font-black text-6xl ${turnColors[item.label]}`}>{item.label}</span>
                          :
                          <span className="font-semibold text-6xl text-indigo-300/30 group-hover:text-indigo-300 transition-colors">{item.id}</span>
                      }
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="w-full rounded-xl border-b-8 border-b-indigo-950 bg-indigo-900 relative mt-5
            before:containt-[''] before:absolute before:block before:h-14 before:w-3 before:bg-indigo-400 before:rounded-lg before:left-8 before:-top-10 before:shadow-[0px_0.3rem] before:shadow-blue-950/90
            after:containt-[''] after:absolute after:block after:h-14 after:w-3 after:bg-indigo-400 after:rounded-lg after:right-8 after:-top-10 after:shadow-[0px_0.3rem] after:shadow-blue-950/90
          ">
            <div className="text-center flex justify-center gap-2 items-center py-3 text-3xl">
              <span className={`font-bold uppercase ${turnColors[gameObject.turn || 'x']}`}>{gameObject.turn}</span>
              <span className="font-medium text-white">TURN</span>
            </div>
          </div>
        </div>
        <div className="w-full flex-auto md:max-w-1/2"></div>
      </div>
    </>
  );
}

export default GameBoard;
