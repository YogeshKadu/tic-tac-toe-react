import React, { useState } from "react";
// import useProfileContext from '../context/user.context';
import SpinnerIcon from "../components/icons/SpinnerIcon";
import usePeerContext from "../context/peer.context";
import StarIcon from "../components/icons/StarIcon";
import { textColors } from "../constants/colors";

// const textColors = ["text-cyan-100", "text-pink-200", "text-white"];

function Login() {
  // const { login, loading } = useProfileContext();
  const { login, loading } = usePeerContext();
  const [name, setName] = useState("");

  const HandleChange = (event) => {
    const { value } = event?.target;
    setName(value);
  };
  const HandleSubmit = (event) => {
    event.preventDefault();
    if (!loading) login(name);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-10 md:flex-row py-6">
        <div className="max-w-1/2 w-full flex-auto hidden md:block">
          <h3 className="relative rounded-full bg-indigo-900/70 px-6 py-3 text-center font-semibold text-white uppercase">
            Monthly Leaderboard
          </h3>
          {/* TODO: REMOVE UNWANTED CODE */}
          <div className="mt-8 #flex hidden flex-col gap-y-5 text-white">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div className="flex gap-x-2" key={idx}>
                <span className="w-10 flex-none">
                  <StarIcon className="mx-auto h-6 w-6" />
                </span>
                <p className="flex-1 truncate">{`Player_${idx + 1}`}</p>
                <div
                  className={`w-24 flex-none rounded-lg px-5 py-2 text-right ${idx % 2 ? "bg-indigo-900/80" : "bg-indigo-900"}`}
                >
                  {Math.floor(Math.random() * 200) + 1}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-y-3">
            {/* <ul className="list-inside list-decimal text-white"> */}
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                className={`flex gap-3 font-semibold ${textColors[idx % textColors.length]}`}
                key={idx}
              >
                <div
                  className={`flex-1 truncate rounded-lg px-5 py-2 ${idx % 2 ? "bg-indigo-900/80" : "bg-indigo-900"}`}
                >
                  {`${idx + 1}. Player_${idx + 1}`}
                </div>
                <div
                  className={`w-24 flex-none rounded-lg px-5 py-2 ${idx % 2 ? "bg-indigo-900/80" : "bg-indigo-900"}`}
                >
                  {Math.floor(Math.random() * 200) + 1}
                </div>
              </div>
            ))}
            {/* </ul> */}

            {/* <ul className="list-inside list-decimal text-white">
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
              <li className="my-3">Not Recorded</li>
            </ul> */}
          </div>
        </div>
        <div className="flex md:max-w-1/2 w-full flex-auto flex-col gap-5">
          {/* <div className="flex flex-auto flex-col gap-5"> */}
          <h3 className="relative rounded-xl bg-indigo-900 px-6 py-3 text-center font-semibold text-white uppercase">
            Login
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
          <div className="mt-5">
            <form onSubmit={HandleSubmit}>
              <input
                type="text"
                autoFocus={true}
                value={name}
                onChange={HandleChange}
                className="input-border h-12 w-full rounded-lg bg-white px-5 text-center outline-none"
                placeholder="Username..."
              />
              <button
                disabled={!name}
                className="button-border mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-900/80 font-semibold text-white uppercase disabled:cursor-not-allowed disabled:bg-indigo-900/50"
              >
                SUBMIT
                {loading && <SpinnerIcon className="h-6 w-6 animate-spin" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
