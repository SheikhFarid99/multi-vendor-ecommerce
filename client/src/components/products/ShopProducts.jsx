import React, { useEffect } from 'react'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import Ratings from '../Ratings'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { add_to_card, messageClear, add_to_wishlist } from '../../store/reducers/cardReducer'

const ShopProducts = ({ styles, products }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.card)

    const add_card = (id) => {
        
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])

    const add_wishlist = (pro) => {

        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }

    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-3 md:grid-cols-2'} gap-3`}>
            {
                products.map((p, i) => <div key={i} className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 bg-white p-1 rounded-md`}>
                    <div className={styles === 'grid' ? 'w-full relative group aspect-square overflow-hidden' : 'md-lg:w-full relative group aspect-square overflow-hidden'}>
                        <img className='rounded-md aspect-square w-full object-cover' src={p.images[0]} alt="image" />
                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                            <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
                            <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><FaEye /></Link>
                            <li onClick={() => add_card(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>
                        </ul>
                    </div>
                    <div className='flex justify-start items-start flex-col gap-1'>
                        <h2 className='text-md text-slate-700 font-medium'>{p.name?.slice(0,40)}...</h2>
                        <div className='flex justify-start items-center gap-2'>
                            <span className='text-md  font-bold text-slate-700'>${p.price}</span>
                            <div className='flex text-lg'>
                                <Ratings ratings={p.rating} />
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default ShopProducts