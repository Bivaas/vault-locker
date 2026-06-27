import React from 'react'

const Navbar = () => { 

    return ( 

        // Navbar setup 
        <nav className = 'bg-blue-200 flex justify-between items-center px-4 h-12'>

            <div className="logo font-bold">Vault Locker</div>

            <ul>
                <li className='flex gap-4'>

                    <a classname='hover:font-bold' href='/'>Home</a>
                    <a classname='hover:font-bold' href='#'>About</a>
                    <a classname='hover:font-bold' href='#'>Contact</a> 


                </li>
            </ul> 

        </nav>
    )
}


export default Navbar