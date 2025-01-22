import React from 'react'
import { Link } from 'react-router-dom'

const UnAuthorized = () => {
    return (
        <div className='flex w-screen h-screen bg-[#283046] flex-col gap-x-4 text-[#D0D2D6] justify-center items-center'>
            <h2 className='text-5xl pb-4'>You can't access this page</h2>
            <button className='bg-blue-500  hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mt-3'>
                <Link to={'/'}>Back to Dashboard</Link>
            </button>
        </div>
    )
}

export default UnAuthorized