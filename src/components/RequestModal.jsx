import React from 'react';

function RequestModal() {
    return (
        <div className='w-ful h-svh bg-slate-950/80 absolute inset-0 flex items-center'>
            <div className='max-w-sm w-full mx-auto p-3 md:p-5'>
                <div className='bg-teal-300 p-5 input-border rounded-md w-full'>
                    <h3 className='text-center mb-1 text-slate-800 font-bold text-lg'>New Game Request !</h3>
                    <p></p>
                    <div className='flex justify-between mt-8'>
                        <button className='button-border cursor-pointer px-5 h-10 rounded-lg bg-red-500 text-white'>
                            Cancel
                        </button>
                        <button className='button-border cursor-pointer px-5 h-10 rounded-lg bg-blue-500 text-white'>
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestModal