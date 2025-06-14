import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from "uuid";
const Manager = () => {
    const ref = useRef(null);
    const [form, setForm] = useState({
        site: "",
        username: "",
        password: "",
    });
    const [passwordsArray, setPasswordsArray] = useState([]);
    const getPasswords = async () => {

        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords);
        setPasswordsArray(passwords);
    }

    useEffect(() => {
        getPasswords()
    }, []);
    const showPassword = () => {
        const passwordInput = document.querySelector('input[name="password"]');
        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/eyeodd.png";
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
            ref.current.src = "icons/eye.png";
        }
    }
    const savePassword = async () => {
        if (form.username.length > 3 && form.password.length > 3) {

            if (form.id) {
                
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: form.id })
                })
            }

            setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
            let res = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            setForm({
                site: "",
                username: "",
                password: ""
            })
        }
        else {
            alert('length should be greater than 5')
        }
    }


    const deletePassword = async (id) => {
        let c = confirm("delete?")
        if (c) {

            setPasswordsArray(passwordsArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })

        }

    }
    const editPassword = (id) => {
        setForm({ ...passwordsArray.filter(item => item.id === id)[0], id: id })
        setPasswordsArray(passwordsArray.filter(item => item.id !== id))

    }



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const copyText = (text) => {
        // alert(text)
        toast.success('copied successfully!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    return (
        < >
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className=" md:mycontainer min-h-screen mb-4 w-full lg:p-[90px]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-700">
                        &lt;
                    </span>
                    <span className=" ">

                        PassOP/
                    </span>
                    <span className="text-green-700">
                        &gt;
                    </span>
                </h1>
                <p className='text-green-900 text-lg text-center mt-4'>Your password Manager</p>

                <div className=" flex flex-col p-4 text-black gap-5 items-center mt-5" >
                    <input onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-2' type="text" placeholder='enter website url' value={form.site} name='site' />

                    <div className="flex w-full gap-4 justify-between">
                        <input onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-2' type="text" placeholder='enter username' value={form.username} name='username' />

                        <div className="relative  flex items-center gap-10 w-full">
                            <input onChange={handleChange} className='rounded-full border border-green-500 w-full px-5 py-2' type="password" placeholder='enter password' value={form.password} name='password' />

                            <span className='absolute right-3 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="/icons/eye.png" alt="Eye Icon" className='text-black invert ' />

                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center item-center bg-green-600 w-fit rounded-full px-4 py-2 font-bold hover:bg-green-700 hover:text-white gap-3 border-2 border-green-900 mt-7'>

                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="click"
                            state="hover-swirl"
                        // colors="primary:#3bccd1,secondary:#3bccd1"
                        // style="width:250px;height:250px"
                        >
                        </lord-icon>
                        <span className='w-fit  m-auto'>Add Password</span>
                    </button>
                </div>
                <div className="passwords md:mb-[123px] mb-[255px]">
                    <h2 className='font-bold py-4 text-2xl text-center'>Your Passwords</h2>
                    {passwordsArray.length === 0 && <div className='text-center font-bold my-4 text-xl text-red-400'>No passwords saved yet</div>}
                    {passwordsArray.length > 0 && <div className=" mx-2 md:mx-0 overflow-x-auto">
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr className='h-10'>
                                    <th className='border w-[20%]'>Site</th>
                                    <th className='border w-[20%]'>Username</th>
                                    <th className='border w-[20%]'>Password</th>
                                    <th className='border w-[20%]'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100 border'>
                                {passwordsArray.map((item, index) => (
                                    <tr key={index} className='h-10'>

                                        <td className='border-x  px-4 gap-5 py-1'>
                                            <a className='text-blue-500 hover:text-blue-700' href={item.site} target="_blank" rel="noopener noreferrer">{item.site}
                                            </a>

                                        </td>
                                        <td className='border-x text-center '>
                                            <div className="flex justify-center items-center">
                                                <span className='mx-6'>{item.username}</span>
                                                <div onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                        className="cursor-pointer">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='border-x text-center '>
                                            <div className="flex justify-center items-center">
                                                <span className='mx-6'>{"*".repeat(item.password.length)}</span>
                                                <div onClick={() => { copyText(item.password) }} className='mt-2'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                        className="cursor-pointer">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className='flex justify-center'>

                                                <span onClick={() => { editPassword(item.id) }} className='cursor-pointer mx-2'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        className="cursor-pointer">
                                                    </lord-icon>
                                                </span>
                                                <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        className="cursor-pointer">
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}

                </div>
            </div>
        </>
    )
}

export default Manager
