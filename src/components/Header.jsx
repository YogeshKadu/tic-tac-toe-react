import React from 'react';
// import useProfileContext from '../context/user.context';
import LogoutIcon from './icons/LogoutIcon';
import usePeerContext from '../context/peer.context';

function Header() {
    // const { username, logout } = useProfileContext();
    const { username, logout } = usePeerContext();
    const HandleLogout = () => {
        logout();
    }

    return (
        <div className='border-indigo-500/50 px-3 md:px-5'>
            <header className='text-white flex h-12 items-center justify-end relative'>
                {/* <button></button> */}
                <h1 className='font-bold text-base md:text-lg text-center font-open-sans absolute left-1/2  -translate-x-1/2'>TIC TAC TOE</h1>
                {
                    username && <button className='h-8 w-8 rounded-full cursor-pointer aspect-square bg-red-500 grid place-content-center button-border' onClick={() => HandleLogout()}>
                        <LogoutIcon className="w-6 h-6" />
                    </button>
                }
            </header>
            <div>
                <p className='font-bold text-2xl text-center my-3 text-white'>{username ? username : 'Not Connected !'}</p>
            </div>
        </div>
    )
}

export default Header