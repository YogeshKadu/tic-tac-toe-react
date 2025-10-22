import React from "react";
// import useProfileContext from "../context/user.context";
import CloseIcon from "./icons/CloseIcon";
import usePeerContext from "../context/peer.context";

function RequestModal() {
  // const { peerInstance, connectionRequest, cancelGame } = useProfileContext();
  const { connectionRequest, isWaiting, connectionRequestID, AcceptRequest, RejectRequest } =
    usePeerContext();

  if (connectionRequest && !isWaiting)
    return (
      <div className="w-ful absolute inset-0 flex h-svh items-center bg-slate-950/80">
        <div className="relative mx-auto w-full max-w-sm p-3 md:p-5">
          <div className="input-border w-full rounded-md bg-teal-300 p-5">
            <h3 className="mb-1 text-center text-lg font-bold text-slate-800">
              New Game Request !
            </h3>
            <p className="text-center text-slate-700">
              <span className="font-bold">"{connectionRequestID}"</span> Wants
              to play a match
            </p>
            <div className="mt-8 flex flex-col gap-3 md:flex-row md:justify-between">
              <button
                className="button-border h-10 cursor-pointer rounded-lg bg-red-500 px-5 text-white"
                onClick={() => RejectRequest()}
              >
                Cancel
              </button>
              <button
                autoFocus={true}
                className="button-border h-10 cursor-pointer rounded-lg bg-blue-500 px-5 text-white"
                onClick={() => AcceptRequest()}
              >
                Ok
              </button>
            </div>
          </div>
          <button
            className="button-border gridbox-center absolute top-1 right-1 h-8 w-8 cursor-pointer rounded-lg bg-red-500 text-white"
            onClick={() => RejectRequest()}
          >
            <CloseIcon className="h-6 w-6 text-slate-800" />
          </button>
        </div>
      </div>
    );

  return <></>;
}

export default RequestModal;
