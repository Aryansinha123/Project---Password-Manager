import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-slate-800 sticky top-0">
            <div className="mycontainer flex justify-between items-center p-4 text-white">

                <div className="logo font-bold text-2xl flex">
                    <img src="fav1.svg" alt="" className='w-10 h-10'/>
                    <span className="text-green-700">
                        &lt;
                    </span>
                    <span className="text-white ">
                        PassOP
                    </span>
                    <span className="text-green-700">
                        &gt;
                    </span>
                </div>
                <ul className='flex gap-5'>
                    <li><a className='hover:font-bold' href="#">Home</a></li>
                    <li className='w-16 '><a className='hover:font-bold ' href="#">About</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
