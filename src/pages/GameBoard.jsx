import React, { useState } from "react";
import usePeerContext from "../context/peer.context";
import { turnColors } from "../constants/colors";
import Confetti from 'react-confetti-boom';

function GameBoard() {
  const { gameObject, username, Selection, ResetGame } = usePeerContext();
  const isMyTurn = gameObject[gameObject.turn] == username;
  const myLabel = gameObject.x == username ? 'x' : 'o';
  const { isGameOver, winningCombo, winnerID } = gameObject;

  return (
    <>
      <div className="flex flex-col gap-10 py-3 md:flex-row md:py-6 md:items-start">
        <div className="w-full flex-auto md:max-w-1/2">
          <div className="w-full rounded-xl border-b-8 border-b-indigo-950 bg-indigo-900 relative
            before:containt-[''] before:absolute before:block before:h-14 before:w-3 before:bg-indigo-400 before:rounded-lg before:left-8 before:-bottom-11 before:shadow-[0px_0.3rem] before:shadow-blue-950/90
            after:containt-[''] after:absolute after:block after:h-14 after:w-3 after:bg-indigo-400 after:rounded-lg after:right-8 after:-bottom-11 after:shadow-[0px_0.3rem] after:shadow-blue-950/90
          ">
            <div className="flex justify-evenly items-center py-5">
              <div className="text-cyan-300 text-center font-semibold">
                <p>{gameObject.x}</p>
                <span className="font-bold text-6xl">X</span>
              </div>
              <span className="text-white text-3xl font-semibold">VS</span>
              <div className="text-pink-300 text-center font-semibold">
                <p>{gameObject.o}</p>
                <span className="font-bold text-6xl">O</span>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="rounded-xl bg-indigo-900 px-6 py-8 font-baloo">
              <div className="grid grid-cols-3 gap-5">
                {
                  gameObject?.tiles.map((item, index) => (
                    <button onClick={() => Selection(item.id)} key={item.id}
                      disabled={!isMyTurn || item.disabled || isGameOver}
                      className={`${winningCombo.includes(index) ? turnColors[item.label].bg : 'bg-indigo-400/40 disabled:bg-blue-950'} aspect-square overflow-hidden rounded-lg shadow-blue-950 shadow-[0px_0.5rem] active:shadow-none active:translate-y-2 group cursor-pointer disabled:cursor-not-allowed transition-all`}>
                      {
                        item.selected ?
                          <span className={`font-black text-7xl ${winningCombo.includes(index) ? 'text-indigo-900' : turnColors[item.label].text}`}>{item.label}</span>
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
              {
                isGameOver ?
                  <>
                    <span className="font-bold uppercase text-pink-300">!! Game</span> <span className="font-bold uppercase text-cyan-300">Over !!</span>
                  </>
                  :
                  <>
                    <span className={`font-bold uppercase ${turnColors[gameObject.turn || 'x'].text}`}>{gameObject.turn}</span>
                    <span className="font-medium text-white">TURN</span>
                  </>
              }
            </div>
          </div>
        </div>
        <div className="w-full flex-auto md:max-w-1/2">
          <h3 className="relative text-xl rounded-full bg-indigo-900/70 px-6 py-3 text-center font-semibold text-white uppercase">
            <span className="font-baloo">Hello</span> <span className="font-noto">👋</span>
          </h3>
          <div className="mt-6 flex flex-col gap-y-3">
            <div className="w-full rounded-xl border-b-8 border-b-indigo-950 bg-indigo-900 relative
              before:containt-[''] before:absolute before:block before:h-14 before:w-3 before:bg-indigo-400 before:rounded-lg before:left-8 before:-top-10 before:shadow-[0px_0.3rem] before:shadow-blue-950/90
              after:containt-[''] after:absolute after:block after:h-14 after:w-3 after:bg-indigo-400 after:rounded-lg after:right-8 after:-top-10 after:shadow-[0px_0.3rem] after:shadow-blue-950/90
            ">
              <div className="text-center flex justify-center gap-2 items-center py-3 text-3xl">
                <span className="font-medium text-white">{username}</span>
              </div>
            </div>
          </div>
          {
            isGameOver && (
              <>
                <div className="mt-6 flex flex-col gap-y-3">
                  <div className="w-full rounded-xl border-b-8 border-b-indigo-950 bg-indigo-900 relative aspect-square
                    before:containt-[''] before:absolute before:block before:h-14 before:w-3 before:bg-indigo-400 before:rounded-lg before:left-8 before:-top-10 before:shadow-[0px_0.3rem] before:shadow-blue-950/90
                    after:containt-[''] after:absolute after:block after:h-14 after:w-3 after:bg-indigo-400 after:rounded-lg after:right-8 after:-top-10 after:shadow-[0px_0.3rem] after:shadow-blue-950/90
                  ">
                    <div className="w-full h-full gridbox-center overflow-hidden">
                      <div className="text-center py-3 text-3xl">
                        {
                          winnerID ?
                            <>
                              <p className="font-medium text-white">You</p>
                              <span className={`font-bold text-6xl uppercase ${turnColors[myLabel || 'x'].text}`}>{winnerID === username ? 'WIN' : 'LOST'}</span>
                              <p className="font-medium text-white">The Match !</p>
                            </>
                            :
                            <>
                              <p className="font-medium text-white">You</p>
                              <span className={`font-bold uppercase ${turnColors[myLabel || 'x'].text}`}>{myLabel}</span>
                            </>
                        }
                      </div>
                    </div>
                    {winnerID == username && <Confetti mode="fall" particleCount={10} colors={['#fb2c36', '#05df72', '#ffd230']} shapeSize={30} />}
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-y-3 relative
                  before:containt-[''] before:absolute before:block before:h-14 before:w-3 before:bg-indigo-400 before:rounded-lg before:left-8 before:-top-10 before:shadow-[0px_0.3rem] before:shadow-blue-950/90
                  after:containt-[''] after:absolute after:block after:h-14 after:w-3 after:bg-indigo-400 after:rounded-lg after:right-8 after:-top-10 after:shadow-[0px_0.3rem] after:shadow-blue-950/90
                ">
                  <button className="py-3 w-full bg-pink-500 rounded-lg shadow-[0px_0.35rem] shadow-pink-900" onClick={() => ResetGame()}>
                    <span className="font-semibold text-3xl text-indigo-950">Try Again</span>
                  </button>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

export default GameBoard;
