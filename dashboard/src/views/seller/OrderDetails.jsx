import React from 'react'

const OrderDetails = () => {
    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4  bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-xl text-[#d0d2d6]'>Order Details</h2>
                    <select name="" id="" className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="">pending</option>
                        <option value="">processing</option>
                        <option value="">warehouse</option>
                        <option value="">placed</option>
                        <option value="">cancelled</option>
                    </select>
                </div>
                <div className='p-4'>
                    <div className='flex gap-2 text-lg text-[#d0d2d6]'>
                        <h2>#4564345345</h2>
                        <span>3 jun 2023</span>
                    </div>
                    <div className='flex flex-wrap'>
                        <div className='w-[32%]'>
                            <div className='pr-3 text-[#d0d2d6] text-lg'>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='pb-2 font-semibold'>Deliver to : Warehouse</h2>
                                </div>
                                <div className='flex justify-start items-center gap-3'>
                                    <h2>Payment Status : </h2>
                                    <span className='text-base'>paid</span>
                                </div>
                                <span>Price : $5565</span>
                                <div className='mt-4 flex flex-col gap-4'>
                                    <div className='text-[#d0d2d6]'>
                                        <div className='flex gap-3 text-md'>
                                            <img className='w-[45px] h-[45px]' src={`http://localhost:3000/images/category/1.jpg`} alt="" />
                                            <div>
                                                <h2>long long T-Shart</h2>
                                                <p>
                                                    <span>Brand : </span>
                                                    <span>Easy </span>
                                                    <span className='text-lg'>Quantity : 2</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex gap-3 text-md'>
                                            <img className='w-[45px] h-[45px]' src={`http://localhost:3000/images/category/1.jpg`} alt="" />
                                            <div>
                                                <h2>long long T-Shart</h2>
                                                <p>
                                                    <span>Brand : </span>
                                                    <span>Easy </span>
                                                    <span className='text-lg'>Quantity : 2</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex gap-3 text-md'>
                                            <img className='w-[45px] h-[45px]' src={`http://localhost:3000/images/category/1.jpg`} alt="" />
                                            <div>
                                                <h2>long long T-Shart</h2>
                                                <p>
                                                    <span>Brand : </span>
                                                    <span>Easy </span>
                                                    <span className='text-lg'>Quantity : 2</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails