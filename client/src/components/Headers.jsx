import React from 'react'
import { GrMail } from 'react-icons/gr'
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa'
import { AiOutlineTwitter, AiFillGithub } from 'react-icons/ai'
const Headers = () => {
    return (
        <div className='w-full bg-white'>
            <div className='header-top bg-[#eeeeee] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
                        <ul className='flex justify-start items-center gap-8'>
                            <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                                <span><GrMail /></span>
                                <span>sheikhfarid@gmail.com</span>
                            </li>
                            <span>Multi vendor ecommerce</span>
                        </ul>
                        <div>
                            <div className='flex justify-center items-center gap-10'>
                                <div className='flex justify-center items-center gap-4'>
                                    <a href="#"><FaFacebookF /></a>
                                    <a href="#"><AiOutlineTwitter /></a>
                                    <a href="#"><FaLinkedinIn /></a>
                                    <a href="#"><AiFillGithub /></a>
                                </div>
                                <div className='flex cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Headers