import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'

import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'

function App() { 

    return ( 

        <>
        
            <Navbar/>

            <SignedIn>

                <Manager />

            </SignedIn>

            <SignedOut>

                <div className="flex flex-col items-center justify-center gap-4 mt-20">

                    <p className = 'text-lg'>Sign in first to access vault !</p>

                    <SignInButton mode="modal">

                    <button className="bg-orange-700 hover:bg-green-700 text-white rounded-full px-6 py-2">
                        Sign In
                    </button>

                    </SignInButton>


                </div>
            </SignedOut>
        </>
    )
}

export default App