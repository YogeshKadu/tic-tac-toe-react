import React, { useState } from "react";
import { Outlet } from "react-router";
import LogoutIcon from "../components/icons/LogoutIcon";
import usePeerContext from "../context/peer.context";
import DownArrowIcon from "../components/icons/DownArrowIcon";

function Layout() {
  const [open, setOpen] = useState(false);
  const { username, logout } = usePeerContext();
  const HandleToggle = () => setOpen(!open);
  const HandleLogout = () => {
    HandleToggle();
    logout();
  };

  return (
    <>
      <div className="font-baloo min-h-svh bg-indigo-300">
        <header className="relative mx-auto w-full max-w-3xl py-3 px-6 md:py-6">
          <h1 className="text-3xl font-black text-white md:text-5xl">
            TIC TAC <span className="text-indigo-100">TOE.</span>
          </h1>
          <div
            className={`absolute right-8 bottom-14 z-20 flex h-56 flex-col items-center justify-end gap-2 rounded-b-full bg-indigo-900 transition-all duration-500 ${open ? "translate-y-14" : "translate-y-0"} ease-in-out`}
          >
            {open && (
              <>
                {username && (
                  <button
                    className="button-border grid aspect-square h-8 w-8 cursor-pointer place-content-center rounded-full bg-pink-300 text-amber-800"
                    onClick={() => HandleLogout()}
                  >
                    <LogoutIcon className="h-6 w-6" />
                  </button>
                )}
              </>
            )}
            <button
              className="gridbox-center peer h-10 w-10 cursor-pointer text-white transition-transform active:scale-90 [&_svg]:h-6 [&_svg]:w-6"
              onClick={HandleToggle}
            >
              <DownArrowIcon className={`transition-all rotate-0 duration-200 ease-out delay-300 ${open && '!rotate-180'}`} />
            </button>
          </div>
        </header>
        <div className="mx-auto w-full max-w-3xl px-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
