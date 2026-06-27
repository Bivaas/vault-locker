import React from 'react'

const Manager = () => { 

    return ( 

        // background setup and main area
        <>

        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="mycontainer">

            <h1 className="text-4xl text font-bold text-center">Vault Lock</h1>
            <p className='text-blue-800 text-lg text-center'>Secure means of storing passwords</p>


            <div className="flex flex-col p-4 text-black gap-6 item-center">


                <input placeholder='Name' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name="" id="" /> 

                    <div className="flex w-full justify-between gap-6">

                        <input placeholder='Description (optional)' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name="" id="" />

                        <input placeholder='Enter your Password' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name="" id="" />

                        <div>
                        <button placeholder='Enter your password' className='flex text-white justify-center items-center gap-2 bg-orange-400 hover:bg-orange-300 rounded-full px-4 py-2 w-fit border-2 border-blue-200'>Add Password</button>
                        </div>
             
                    </div>

            </div>


        </div>

        </>
    )
}

export default Manager