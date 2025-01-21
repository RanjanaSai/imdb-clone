import React from 'react'
import Logo from '../Movielogo.png'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <div className='flex border space-x-8 items-center pl-2 py-2'>
            <img className='w-[50px]' src={Logo} alt="" />
            {/* <a href='/' className='text-blue-500 text-2xl font-bold'>Home</a>
            <a href='/watchlist' className='text-blue-500 text-2xl font-bold'>Watchlist</a> */}

            {/* To improve performance use Link instead of <a></a> */}

            <Link to='/' className='text-blue-500 text-2xl font-bold'>Home</Link>
            <Link to='/watchlist' className='text-blue-500 text-2xl font-bold'>WatchList</Link>
        </div>
    )
}

export default Navbar