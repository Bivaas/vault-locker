import React from 'react'

const Manager = () => { 

    return ( 

        // background setup and main area
        <>

        <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="mx-auto bg-slate-50 mycontainer">

            <h1 className="text-4xl text font-bold text-center">Vault Lock</h1>
            <p className='text-blue-800 text-lg text-center'>Secure means of storing passwords</p>


            <div className="text-white flex flex-col p-4">

                <input className='rounded-full' type="text" name="" id="" /> 

                    <div className="flex">

                        <input type="text" />
                        <input type="text" />
             
                    </div>

            </div>


        </div>

        </>
    )
}

export default Manager