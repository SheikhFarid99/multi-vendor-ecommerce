import React, { useEffect } from 'react'
import Ratings from '../Ratings'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_wishlist_products, remove_wishlist, messageClear } from '../../store/reducers/cardReducer'
import toast from 'react-hot-toast'
const Wishlist = () => {

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { wishlist, successMessage } = useSelector(state => state.card)
    useEffect(() => {
        dispatch(get_wishlist_products(userInfo.id))
    }, [])
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [successMessage])
    return (
        <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
            {
                wishlist.map((p, i) => <div key={i} className='border group transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white'>
                    <div className='relative overflow-hidden'>

                        {
                            p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div>
                        }

                        <img className='sm:h-full w-full h-[240px]' src={p.image} alt="product image" />
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => dispatch(remove_wishlist(p._id))} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
                            <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>
                            <li className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                        </ul>
                    </div>
                    <div className='py-3 text-slate-600 px-2'>
                        <h2>{p.name}</h2>
                        <div className='flex justify-start items-center gap-3'>
                            <span className='text-lg  font-bold'>${p.price}</span>
                            <div className='flex'>
                                <Ratings ratings={p.rating} />
                            </div>
                        </div>
                    </div>
                </div>)
            }

        </div>
    )
}

export default Wishlist