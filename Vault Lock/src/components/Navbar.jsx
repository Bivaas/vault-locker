import React from 'react'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => { 

    return ( 

        // Navbar setup 
        <nav className = 'bg-blue-300 text-white'>

            <div className="mycontainer flex justify-between items-center px-4 py-5 h-12">

            <div className="logo font-bold text-2xl">Vault Locker</div>

            <ul>
                <li className='flex gap-4'>

                    <a className='hover:font-bold' href='/'>:)</a>
                    <UserButton/>


                </li>
            </ul> 

            </div>

        </nav>
    )
}


export default Navbar