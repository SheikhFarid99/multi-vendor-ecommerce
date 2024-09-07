import React from 'react'
import { Link } from 'react-router-dom'
const Pending = () => {
  return (
    <div className='px-7 py-4'>
      <div className='bg-[#283046] p-4 rounded-md text-[#D0D2D6]'>
        <p>Please submit your others information and active stripe connect account, then admin review your account and active</p>
        <button className='bg-blue-500  hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mt-3'>
          <Link to={'/seller/dashboard/profile'}>Update Information</Link>
        </button>
      </div>
    </div>
  )
}

export default Pending