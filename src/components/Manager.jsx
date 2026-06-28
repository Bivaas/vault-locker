import React from 'react'
import { useRef, useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid'; 

const Manager = () => { 

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({site: "", username: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => { 

        let passwords = localStorage.getItem("passwords");
        let passwordArray;

        if (passwords) { 

            setPasswordArray(JSON.parse(passwords))
        }
        else {
            passwordArray = []
        }
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


    const savePassword = () => {

        setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
        localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        setform({ site: "", username: "", password: "" })

    }

    const deletePassword = (id) => { 

        let c = confirm("Confirm deletion ? ")
        if (c) { 

            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
        
    }

    const editPassword = (id) => {

        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasssswordArray(passwordArray.filter(item=>item.id!==id))
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
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter your Password' className='rounded-full border border-blue-500 w-full p-4 py-1' type="password" name="password" id="" />

                                <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} className='p-1' width={27} src='eye.png' alt="eye"/>
                                </span>
                            </div>


                        </div>

                    </div>


                    <button onClick={savePassword} className='flex text-white justify-center items-center gap-2 bg-orange-400 hover:bg-orange-300 rounded-full px-4 py-2 w-fit border-2 border-blue-200'>
                        Save Password
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
                            <th className='py-2'>Actions</th>
                        </tr>
                    </thread>

                    <tbody className='bg-blue-100'>

                        {passwordArray.map((item) => {

                            return <tr key = {index}>

                            <td className='py-2 border border-white text-center w-32'>{item.site}</td>
                            <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                            <td className='py-2 border border-white text-center w-32'>{item.password}

                                <div className="pwcopy flex items-center justify-center size-7 cursor-pointer" onClick={()=>{copyText(item.password)}}>

                                <span className='absolute right-[3px] top-[4px]'>
                                    <img className='p-1' width={5} src='cp.png' alt="copy"/> 
                                </span>

                                </div>

                            </td>

                            <td className='justify-center py-2 border border-white text-center'>
                                
                                <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}>

                                    <button className="button" onClick={() => editPassword(item.id)}>
                                      <svg className="svg-icon" fill="none" height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
                                        <g stroke="#a649da" strokeLinecap="round" strokeWidth={2}>
                                          <path d="m20 20h-16" />
                                          <path clipRule="evenodd" d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z" fillRule="evenodd" />
                                        </g>
                                      </svg>
                                      <span className="lable">Edit</span>
                                    </button>

                                </span>

                                <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}}>

                                    <button onClick={() => deletePassword(item.id)} className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                                      <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                                      </svg>
                                      Delete
                                    </button>

                                </span>

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