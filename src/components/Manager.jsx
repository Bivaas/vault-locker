import React from 'react'
import { useRef, useState, useEffect} from 'react';

const Manager = () => { 

    const ref = useRef()
    const [form, setform] = useState({site: "", username: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => { 

        let passwords = localStorage.getItem("passwords");
        let passwordArray;

        if (passwords) { 

            setPasswordArray(JSON.parse("passwords"))
        }
        else {
            passwordArray = []
        }
    }, [])

    // showpass fn upon clicking the eye
    const showPassword = () => { 

        if(ref.current.src.includes("eye.png")) {

            ref.current.src = 'hidden.png'

        }
        else {

            ref.current.src = 'eye.png'
        }
    }


    const savePassword = () => {

        setpasswordArray([...passwordArray, form])
        localStorage.setItem("password", JSON.stringify([...passwordArray, form]))

    }


    const handleChange = (e) => { 

        setform({...form, [e.target.name]: e.target.value})
    }


    return ( 

        // background setup and main area
        <>

        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="mycontainer">

            <h1 className="text-4xl text font-bold text-center">Vault Lock</h1>
            <p className='text-blue-800 text-lg text-center'>Secure means of storing passwords</p>


            <div className="flex flex-col p-4 text-black gap-6 item-center">

            
                <input value={form.site} onChange={handleChange} placeholder='Name' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name="site" id="" /> 

                    <div className="flex w-full gap-6">

                        <input value={form.username} onChange={handleChange} placeholder='Description (optional)' className='rounded-full border border-blue-500 flex-1 p-4 py-1' type="text" name="username" id="" />

                        <div className="flex items-center gap-4 flex-shrink-0">

                            <div className="relative">
                                <input value={form.password} onChange={handleChange} placeholder='Enter your Password' className='rounded-full border border-blue-500 w-full p-4 py-1' type="text" name="password" id="" />

                                <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} className='p-1' width={27} src='eye.png' alt="eye"/>
                                </span>
                            </div>


                        </div>

                    </div>


                    <button onClick={savePassword} className='flex text-white justify-center items-center gap-2 bg-orange-400 hover:bg-orange-300 rounded-full px-4 py-2 w-fit border-2 border-blue-200'>
                        Add Password
                    </button>

            </div>

            
            <div className="passwords">
                <h2 className='font-bold text-2xl py-4'>Your saved passwords</h2> 

                {passwordArray.length === 0 && <div>Save some passwords first !</div>}

                {passwordArray.length !=0 && <table className="table-auto w-full rounded-md overflow-hidden">

                    <thread className='bg-blue-700 text-white'>
                        <tr>
                            <th className='py-2'>Name</th>
                            <th className='py-2'>Description (optional)</th>
                            <th className='py-2'>Password</th>
                        </tr>
                    </thread>

                    <tbody className='bg-blue-100'>

                        {passwordArray.map((item) => {

                            return <tr key = {index}>

                            <td className='py-2 border border-white text-center w-32'>{item.site}</td>
                            <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                            <td className='py-2 border border-white text-center w-32'>{item.password}</td>
                        </tr>

                        })}

                    </tbody>


                </table>}
            </div>


        </div>

        </>
    )
}

export default Manager