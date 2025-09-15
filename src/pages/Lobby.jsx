import React, { useState } from 'react'
import useProfileContext from '../context/user.context';
import SpinnerIcon from '../components/icons/SpinnerIcon';

function Lobby() {
    const { loading, sendGameRequest } = useProfileContext();
    const [name, setName] = useState("");

    const HandleChange = (event) => {
        const { value } = event?.target;
        setName(value);
    }
    const HandleSubmit = (event) => {
        event.preventDefault();
        if (!loading)
            sendGameRequest(name);
    }

    return (
        <div className='max-w-sm mx-auto w-full p-3 md:p-5'>
            <form onSubmit={HandleSubmit} className='bg-teal-300 p-5 input-border rounded-md'>
                <h3 className='text-center mb-1 text-slate-800 font-bold text-lg'>Lobby</h3>
                <p className='text-center mb-5 text-neutral-700'>Wait for other or request for a match</p>
                <input type="text" value={name} onChange={HandleChange} className='bg-white h-12 px-5 rounded-lg w-full outline-none text-center input-border' placeholder='Username...' />
                <button disabled={!name} className='w-full flex gap-2 items-center justify-center mt-5 h-12 disabled:bg-gray-400 disabled:cursor-not-allowed bg-indigo-700 rounded-lg text-white font-semibold cursor-pointer button-border'>
                    Request
                    {
                        loading && <SpinnerIcon className="h-6 w-6 animate-spin" />
                    }
                </button>
            </form>
        </div>
    )
}

export default Lobby;