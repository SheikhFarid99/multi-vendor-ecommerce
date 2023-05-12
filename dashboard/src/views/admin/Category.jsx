import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { BsImage } from 'react-icons/bs'
const Category = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false)
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#283046] rounded-md'>
                <h1 className='text-[#d0d2d6] font-semibold text-lg'>Categorys</h1>
                <button onClick={() => setShow(true)} className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-4 py-2 cursor-pointer text-white rounded-sm text-sm'>Add</button>
            </div>
            <div className='flex flex-wrap w-full'>
                <div className='w-full lg:w-7/12'>
                    <div className='w-full p-4  bg-[#283046] rounded-md'>
                        <div className='flex justify-between items-center'>
                            <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                                <option value="5">5</option>
                                <option value="5">15</option>
                                <option value="5">25</option>
                            </select>
                            <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                        </div>
                        <div className='relative overflow-x-auto'>
                            <table className='w-full text-sm text-left text-[#d0d2d6]'>
                                <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                    <tr>
                                        <th scope='col' className='py-3 px-4'>No</th>
                                        <th scope='col' className='py-3 px-4'>Image</th>
                                        <th scope='col' className='py-3 px-4'>Name</th>
                                        <th scope='col' className='py-3 px-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [1, 2, 3, 4, 5].map((d, i) => <tr key={i}>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{d}</td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <img className='w-[45px] h-[45px]' src={`http://localhost:3000/images/category/${d}.jpg`} alt="" />
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span>Sports</span>
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <div className='flex justify-start items-center gap-4'>
                                                    <Link className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>
                                                    <Link className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaTrash /></Link>
                                                </div>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={50}
                                parPage={parPage}
                                showItem={4}
                            />
                        </div>
                    </div>
                </div>
                <div className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[9999] top-0 transition-all duration-500`}>
                    <div className='w-full pl-5'>
                        <div className='bg-[#283046] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]'>
                            <div className='flex justify-between items-center mb-4'>
                                <h1 className='text-[#d0d2d6] font-semibold text-xl'>Add Category</h1>
                                <div onClick={()=>setShow(false)} className='block lg:hidden cursor-pointer'><GrClose className='text-[#d0d2d6]'/></div>
                            </div>
                            <form>
                                <div className='flex flex-col w-full gap-1 mb-3'>
                                    <label htmlFor="name">Category name</label>
                                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" id='name' name='category_name' placeholder='category name' />
                                </div>
                                <div>
                                    <label className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6]' htmlFor="image">
                                        <span><BsImage /></span>
                                        <span>select Image</span>
                                    </label>
                                </div>
                                <input className='hidden' type="file" name='image' id='image' />
                                <div>
                                    <button className='bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2 '>Add Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category