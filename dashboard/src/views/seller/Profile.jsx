import React from 'react'
import { BsImages } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { FadeLoader } from 'react-spinners'
const Profile = () => {
    const image = true
    const loader = false
    const status = 'active'
    const userInfo = true
    return (
        <div className='px-2 lg:px-7 py-5'>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-6/12'>
                    <div className='w-full p-4  bg-[#283046] rounded-md text-[#d0d2d6]'>
                        <div className='flex justify-center items-center py-3'>
                            {
                                image ? <label htmlFor="img" className='h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden'>
                                    <img className='w-full h-full' src="http://localhost:3000/images/admin.jpg" alt="" />
                                    {
                                        loader && <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                                            <span>
                                                <FadeLoader />
                                            </span>
                                        </div>
                                    }
                                </label> : <label className='flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative' htmlFor="img">
                                    <span><BsImages /></span>
                                    <span>Select Image</span>
                                    {
                                        loader && <div className='bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20'>
                                            <span>
                                                <FadeLoader />
                                            </span>
                                        </div>
                                    }
                                </label>
                            }
                            <input type="file" className='hidden' id='img' />
                        </div>
                        <div className='px-0 md:px-5 py-2'>
                            <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative'>
                                <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'><FaEdit /></span>
                                <div className='flex gap-2'>
                                    <span>Name : </span>
                                    <span>Sheikh farid</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Email : </span>
                                    <span>farid@gmail.com</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Role : </span>
                                    <span>Seller</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Status : </span>
                                    <span>active</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Payment Account : </span>
                                    <p>
                                        {
                                            status === 'active' ? <span className='bg-green-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded '>pending</span> : <span className='bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded '>
                                                click active
                                            </span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='px-0 md:px-5 py-2'>
                            {
                                !userInfo ? <form action="">
                                    <div className='flex flex-col w-full gap-1 mb-3'>
                                        <label htmlFor="Shop">Shop Name</label>
                                        <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='shop name' name='shopName' id='Shop' />
                                    </div>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label htmlFor="div">Division</label>
                                        <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='division' name='division' id='div' />
                                    </div>
                                    <div className='flex flex-col w-full gap-1 mb-3'>
                                        <label htmlFor="district">District</label>
                                        <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='district' name='district' id='district' />
                                    </div>
                                    <div className='flex flex-col w-full gap-1 mb-3'>
                                        <label htmlFor="sub">Sub District</label>
                                        <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='sub district' name='subDistrict' id='sub' />
                                    </div>
                                    <button className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2 '>Add</button>
                                </form> : <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative'>
                                    <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'><FaEdit /></span>
                                    <div className='flex gap-2'>
                                        <span>Shop Name : </span>
                                        <span>Sheikh Fashion</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Division : </span>
                                        <span>Rangpur</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>District : </span>
                                        <span>Kurigram</span>
                                    </div>
                                    <div className='flex gap-2'>
                                        <span>Sub District : </span>
                                        <span>Nageshawri</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-6/12'>
                    <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0  '>
                        <div className='bg-[#283046] rounded-md text-[#d0d2d6] p-4'>
                            <h1 className='text-[#d0d2d6] text-lg mb-3 font-semibold'>Change Password</h1>
                            <form>
                                <div className='flex flex-col w-full gap-1 mb-3'>
                                    <label htmlFor="email">Email</label>
                                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="email" placeholder='email' name='email' id='email' />
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="o_password">Old Password</label>
                                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="password" placeholder='old password' name='old_password' id='o_password' />
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label htmlFor="n_password">New Password</label>
                                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="password" placeholder='new password' name='new_password' id='n_password' />
                                </div>
                                <button className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5 '>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile