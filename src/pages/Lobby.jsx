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
        <div className="w-full md:max-w-1/2 flex-auto">
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
        <div className="w-full md:max-w-1/2 flex-auto">
          <h3 className="relative text-xl rounded-full bg-indigo-900/70 px-6 py-3 text-center font-semibold text-white uppercase">
            <span className="font-baloo">Hello</span> <span className="font-noto">👋</span>
          </h3>
          <div className="mt-8 flex flex-col gap-y-3">
            <div className="w-full rounded-xl border-b-8 border-b-indigo-950 bg-indigo-900 relative
            before:containt-[''] before:absolute before:block before:h-14 before:w-3 before:bg-indigo-400 before:rounded-lg before:left-8 before:-top-10 before:shadow-[0px_0.3rem] before:shadow-blue-950/90
            after:containt-[''] after:absolute after:block after:h-14 after:w-3 after:bg-indigo-400 after:rounded-lg after:right-8 after:-top-10 after:shadow-[0px_0.3rem] after:shadow-blue-950/90
          ">
              <div className="text-center flex justify-center gap-2 items-center py-3 text-3xl">
                <span className="font-medium text-white">{username}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Lobby;
