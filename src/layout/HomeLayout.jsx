import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';

function HomeLayout() {
    return (
        <div className='bg-indigo-400 h-svh border-4 border-b-8 border-slate-800 rounded-2xl'>
            <Header />
            <Outlet />
        </div>
    )
}

export default HomeLayout