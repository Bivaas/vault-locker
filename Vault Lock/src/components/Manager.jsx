import React from 'react'
import { useRef, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid'; 

import { useAuth } from '@clerk/clerk-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => { 

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({name: "", description: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    const { getToken } = useAuth()

    const getPasswords = async () => { 

        // token attached for unique pass per usr
        const token = await getToken()

        let req = await fetch(`${import.meta.env.VITE_URL}/`, {

            headers: { "Authorization": `Bearer ${token}` }
        })


        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => { 

        getPasswords()
    }, [])


    // copy test function 
    const copyText = (text) => { 

        navigator.clipboard.writeText(text)
    }

    // showpass fn upon clicking the eye
    const showPassword = () => { 

        passwordRef.current.type = "text"

        if(ref.current.src.includes("eye.png")) {

            ref.current.src = 'hidden.png'
            passwordRef.current.type = "password"

        }
        else {

            ref.current.src = 'eye.png'
            passwordRef.current.type = "text"
        }
    }


    const savePassword = async () => {

        // same token attachment for unique pass save
        const token = await getToken()

        // getting new passwd by deleting old entry with this id 
        await fetch(`${import.meta.env.VITE_URL}/`, { 

            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ id: form.id })

        })

        const newPassword = { ...form, id: uuidv4() }
        setPasswordArray([...passwordArray, newPassword])


        await fetch(`${import.meta.env.VITE_URL}/`, {

            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify(newPassword)

        })

        setform({ name: "", description: "", password: "" })

        toast.success('Password saved !!')

    }


    const deletePassword = async (id) => { 

        // confirm delete window (later ill setup with toast)
        

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            
            // same token for per usr pass deletion
            const token = await getToken()

            await fetch (`${import.meta.env.VITE_URL}/`, { 

                method: "DELETE",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ id })
            })

        toast.success ('Password deleted !!')
        
    }

    const editPassword = (id) => {

        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))

        toast.info ('Editing...')
    }


    const handleChange = (e) => { 

        setform({...form, [e.target.name]: e.target.value})
    }


    return ( 

        // background setup and main area and toast 
        <>

        <ToastContainer position="top-right" autoClose={2000} theme="colored" />

        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="px-2 md:px-0 mycontainer">

            <h1 className="text-4xl text font-bold text-center">Vault Lock</h1>

            <p className='text-blue-800 text-lg text-center'>Secure means of storing passwords</p>


                <div className="flex flex-col gap-6 p-4">


                    <div className="flex flex-col md:flex-row w-full justify-between gap-6">

                        <input value={form.name} onChange={handleChange} placeholder='Name' className='rounded-full border border-blue-500 flex-1 px-4 py-2 focus:outline-none' type="text" name="name" id="name" />

                        <input value={form.description} onChange={handleChange} placeholder='Description (optional)' className='rounded-full border border-blue-500 flex-1 px-4 py-2 focus:outline-none' type="text" name="description" />

                    </div>

                    <div className="relative w-full">

                        <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Your precious password' className='rounded-full border border-blue-500 w-full px-4 py-2 focus:outline-none' type="password" name="password" id="password" />

                        <span className='absolute right-2 top-1/4 cursor-pointer' onClick={showPassword}>

                            <img ref={ref} className='p-1' width={26} src='eye.png' alt="eye"/>

                        </span>

                    </div>


                    <button onClick={savePassword} className='flex text-white justify-center items-center gap-2 bg-orange-400 hover:bg-orange-500 rounded-full px-6 py-2 w-fit border-2 border-blue-200'>
                        Save Password
                    </button>


                </div>


            
            <div className="passwords">
                <h2 className='font-bold text-2xl py-4'>Your saved passwords</h2> 

                {passwordArray.length === 0 && <div>Save some passwords first !</div>}

                {passwordArray.length !=0 && <table className="table-auto w-full rounded-md overflow-hidden">

                    <thead className='bg-blue-700 text-white'>
                        <tr>
                            <th className='py-2'>Name</th>
                            <th className='py-2'>Description (optional)</th>
                            <th className='py-2'>Password</th>
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='bg-blue-100'>

                        {passwordArray.map((item, index) => {

                            return <tr key = {index}>

                            <td className='py-2 border border-white text-center w-32'>{item.name}</td>
                            <td className='py-2 border border-white text-center w-32'>{item.description}</td>

                            <td className='py-2 border border-white text-center w-32'>

                                <div className="flex items-center justify-center gap-2">

                                <span>
                                    {item.password}
                                </span>
                                    <img className='cursor-pointer' width={16} src='cp.png' alt="copy" onClick={()=>{copyText(item.password)}}/> 

                                </div>

                            </td>

                            <td className='jpy-2 border border-white'>

                                <div className="flex items-center justify-center gap-2">

                            
                                <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}>

                                    <button className="button" onClick={() => editPassword(item.id)}>
                                      <svg className="svg-icon" fill="none" height={16} viewBox="0 0 24 24" width={16} xmlns="http://www.w3.org/2000/svg">
                                        <g stroke="#a649da" strokeLinecap="round" strokeWidth={2}>
                                          <path d="m20 20h-16" />
                                          <path clipRule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fillRule="evenodd" />
                                        </g>
                                      </svg>
                                      <span className="lable">Edit</span>
                                    </button>

                                </span>

                                

                                <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}}>

                                    <button onClick={() => deletePassword(item.id)} className="inline-flex items-center px-2 py-1 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                                      <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                                      </svg>
                                      Delete
                                    </button>

                                </span>

                                </div>

                            </td>

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