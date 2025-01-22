import React from 'react'
import { Link } from 'react-router-dom'
const Deactive = () => {
    return (
        <div className='px-7 py-4'>
            <div className='bg-[#283046] p-4 rounded-md text-[#D0D2D6]'>
                <p>Myshop deactivate your account , please contact support</p>
                <button className='bg-blue-500  hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mt-3'>
                    <Link to={'/seller/dashboard/chat-support'}>Contact</Link>
                </button>
            </div>
        </div>
    )
}

export default Deactive