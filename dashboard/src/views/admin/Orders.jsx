import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Pagination from '../Pagination'
import { useSelector, useDispatch } from 'react-redux'
import { get_admin_orders } from '../../store/Reducers/OrderReducer'

const Orders = () => {

    const dispatch = useDispatch()
    const { totalOrder, myOrders } = useSelector(state => state.order)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState('')


    useEffect(() => {
        dispatch(get_admin_orders({
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }))
    }, [parPage,currentPage,searchValue])

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4  bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'>
                        <option value="5">5</option>
                        <option value="5">15</option>
                        <option value="5">25</option>
                    </select>
                    <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                </div>
                <div className='relative mt-5 overflow-x-auto'>
                    <div className='w-full text-sm text-left [#d0d2d6]'>
                        <div className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <div className='flex justify-between items-start'>
                                <div className='py-3 w-[25%]'>Order Id</div>
                                <div className='py-3 w-[13%]'>Price</div>
                                <div className='py-3 w-[18%]'>Payment Status</div>
                                <div className='py-3 w-[18%]'>Order Status</div>
                                <div className='py-3 w-[18%]'>Action</div>
                                <div className='py-3 w-[8%]'>
                                    <MdKeyboardArrowDown />
                                </div>
                            </div>
                        </div>
                        {
                            myOrders.map((o, i) => <div className='text-[#d0d2d6]'>
                                <div className='flex justify-between items-start border-b border-slate-700'>
                                    <div className='py-4 w-[25%] font-medium whitespace-nowrap'>{o._id}</div>
                                    <div className='py-4 w-[13%]'>${o.price}</div>
                                    <div className='py-4 w-[18%]'>{o.payment_status}</div>
                                    <div className='py-4 w-[18%]'>{o.delivery_status}</div>
                                    <div className='py-4 w-[18%]'>
                                        <Link to={`/admin/dashboard/order/details/${o._id}`}>view</Link>
                                    </div>
                                    <div onClick={(e) => setShow(o._id)} className='py-4 cursor-pointer w-[8%]'>
                                        <MdKeyboardArrowDown />
                                    </div>
                                </div>
                                <div className={show === o._id ? 'block border-b border-slate-700 bg-slate-800' : 'hidden'}>
                                    {
                                        o.suborder.map((so, i) => <div className='flex justify-start items-start border-b border-slate-700'>
                                            <div className='py-4 w-[25%] font-medium whitespace-nowrap pl-3'>${so._id}</div>
                                            <div className='py-4 w-[13%]'>${so.price}</div>
                                            <div className='py-4 w-[18%]'>{so.payment_status}</div>
                                            <div className='py-4 w-[18%]'>{so.delivery_status}</div>
                                        </div>)
                                    }
                                </div>
                            </div>)
                        }

                    </div>
                </div>
                {
                    totalOrder <= parPage ? "" : <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalOrder}
                            parPage={parPage}
                            showItem={4}
                        />
                    </div>
                }
            </div>
        </div >
    )
}

export default Orders