import React from "react";
import CloseIcon from "./icons/CloseIcon";
import usePeerContext from "../context/peer.context";

function RequestModal() {
  const { connectionRequest, isWaiting, connectionRequestID, AcceptRequest, RejectRequest } =
    usePeerContext();

  if (connectionRequest && !isWaiting)
    return (
      <div className="w-ful absolute inset-0 flex h-svh items-center bg-indigo-300/60 backdrop-blur">
        <div className="relative mx-auto w-full max-w-sm p-3 md:p-5">
          <div className="w-full rounded-md bg-indigo-900 p-5">
            <h3 className="mb-1 text-center text-lg font-bold text-white">
              New Game Request !
            </h3>
            <p className="text-center text-white">
              <span className="font-bold">"{connectionRequestID}"</span> Wants
              to play a match
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-between">
              <button
                className="button-border h-10 cursor-pointer rounded-lg flex-1 bg-pink-300 px-5 text-amber-800 font-semibold"
                onClick={() => RejectRequest()}
              >
                Cancel
              </button>
              <button
                autoFocus={true}
                className="button-border h-10 cursor-pointer rounded-lg flex-1 bg-sky-300 px-5 text-cyan-900 font-semibold"
                onClick={() => AcceptRequest()}
              >
                Ok
              </button>
            </div>
          </div>
          <button
            className="button-border gridbox-center absolute top-1 right-1 h-10 w-10 cursor-pointer rounded-lg bg-pink-300 text-amber-800"
            onClick={() => RejectRequest()}
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    );

  return <></>;
}

export default RequestModal;
