import React, { useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, Outlet } from 'react-router-dom'
import { FaList } from 'react-icons/fa'
import { RxDashboard } from 'react-icons/rx'
import { RiProductHuntLine } from 'react-icons/ri'
import { BsChat, BsHeart } from 'react-icons/bs'
import { TfiLock } from 'react-icons/tfi'
import { BiLogInCircle } from 'react-icons/bi'
const Dashboard = () => {
    const [filterShow, setFilterShow] = useState(false)
    return (
        <div>
            <Headers />
            <div className='bg-slate-200 mt-5'>
                <div className='w-[90%] mx-auto pt-5 md-lg:block hidden'>
                    <div>
                        <button onClick={()=>setFilterShow(!filterShow)} className='text-center py-3 px-3 bg-indigo-500 text-white'>
                            <FaList />
                        </button>
                    </div>
                </div>
                <div className='h-full mx-auto'>
                    <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
                        <div className={` rounded-md z-50 md-lg:absolute ${filterShow ? '-left-4' : '-left-[360px]'} w-[270px] ml-4 bg-white`}>
                            <ul className='py-2 text-slate-600 px-4'>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><RxDashboard /></span>
                                    <Link to='/dashboard' className='block'>Dashboard</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><RiProductHuntLine /></span>
                                    <Link to='/dashboard/my-orders' className='block'>My Orders</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><BsHeart /></span>
                                    <Link to='/dashboard/my-wishlist' className='block'>Wishlist</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><BsChat /></span>
                                    <Link to='/dashboard/chat' className='block'>Chat</Link>
                                </li>

                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><TfiLock /></span>
                                    <Link to='/dashboard/chage-password' className='block'>Change Password</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><BiLogInCircle /></span>
                                    <div className='block'>Logout</div>
                                </li>
                            </ul>
                        </div>
                        <div className='w-[calc(100%-270px)] md-lg:w-full'>
                            <div className='mx-4 md-lg:mx-0'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard