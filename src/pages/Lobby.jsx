import React, { useState } from "react";
import SpinnerIcon from "../components/icons/SpinnerIcon";
import usePeerContext from "../context/peer.context";
import { textColors } from "../constants/colors";

// const textColors = ["text-cyan-100", "text-pink-200", "text-white"];

function Lobby() {
  const { loading, connectPeer, username, isWaiting } = usePeerContext();
  const [name, setName] = useState("");

  const HandleChange = (event) => {
    const { value } = event?.target;
    setName(value);
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    if (!loading) connectPeer(name);
  };

  return (
    <>
      {/* TODO: REMOVE UNWANTED CODE */}
      <div className="flex flex-col items-center gap-10 py-3 md:flex-row md:py-6">
        <div className="max-w-1/2 flex-auto">
          <h3 className="relative rounded-xl bg-indigo-900 px-6 py-3 text-center font-semibold text-white uppercase">
            Request
            <svg
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-indigo-900"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M4.253 3C2.524 3 1.441 4.87 2.302 6.37l7.744 13.502c.865 1.507 3.039 1.507 3.904 0l7.744-13.503C22.554 4.87 21.472 3 19.742 3z"
              ></path>
            </svg>
          </h3>
          <div className="mt-8 rounded-xl bg-indigo-900/70 p-5">
            <form onSubmit={HandleSubmit}>
              <input
                type="text"
                autoFocus={true}
                onChange={HandleChange}
                placeholder="Challenge player.."
                className="w-full rounded-md border-2 border-indigo-300 bg-indigo-200/20 px-5 py-2 text-white"
              />
              <button
                disabled={!name || isWaiting || loading}
                className="button-border mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-indigo-950 bg-indigo-900/80 font-semibold text-white uppercase shadow-indigo-950 disabled:cursor-not-allowed disabled:bg-indigo-900/50"
              >
                Request
                {isWaiting && <SpinnerIcon className="h-6 w-6 animate-spin" />}
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-1/2 flex-auto">
          <h3 className="relative rounded-full bg-indigo-900/70 px-6 py-3 text-center font-semibold text-white uppercase">
            Lobby
          </h3>
          <div className="mt-8 flex flex-col gap-y-3">
            {/* <div className="bg-indigo-900/80 rounded-lg p-2 px-2.5 flex items-center border-4 border-pink-400">
              <span className={`w-10 ${textColors[textColors.length - 1]}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto size-5" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16m3.536-4.464a.75.75 0 1 0-1.061-1.061a3.5 3.5 0 0 1-4.95 0a.75.75 0 0 0-1.06 1.06a5 5 0 0 0 7.07 0M9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5m3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5s.448 1.5 1 1.5" clip-rule="evenodd"/></svg>
              </span>
              <p className={`flex-1 truncate ${textColors[textColors.length - 1]}`}>{username}</p>
            </div> */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <div className="bg-indigo-900/80 rounded-lg p-2 px-2.5 flex items-center" key={`players_${idx}`}>
                <span className={`w-10 ${textColors[idx % textColors.length]}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto size-5" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16m3.536-4.464a.75.75 0 1 0-1.061-1.061a3.5 3.5 0 0 1-4.95 0a.75.75 0 0 0-1.06 1.06a5 5 0 0 0 7.07 0M9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5m3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5s.448 1.5 1 1.5" clipRule="evenodd" /></svg>
                </span>
                <p className={`flex-1 truncate ${textColors[idx % textColors.length]}`}>{`Player ${idx + 1}`}</p>
                <button className="bg-indigo-900 text-white text-sm px-3 py-0.5 rounded-md cursor-pointer">send</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto hidden w-full max-w-sm p-3 md:p-5">
        <form
          onSubmit={HandleSubmit}
          className="input-border rounded-md bg-teal-300 p-5"
        >
          <h3 className="mb-1 text-center text-lg font-bold text-slate-800">
            Lobby
          </h3>
          <p className="mb-5 text-center text-neutral-700">
            Wait for other or request for a match
          </p>
          <input
            type="text"
            value={name}
            autoFocus={true}
            onChange={HandleChange}
            className="input-border h-12 w-full rounded-lg bg-white px-5 text-center outline-none"
            placeholder="Username..."
          />
          <button
            disabled={!name}
            className="button-border mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-700 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Request
            {loading && <SpinnerIcon className="h-6 w-6 animate-spin" />}
          </button>
        </form>
      </div>
    </>
  );
}

export default Lobby;
