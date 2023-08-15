import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import Ratings from '../components/Ratings'
import { AiFillHeart } from 'react-icons/ai'
import { FaFacebookF, FaLinkedin } from 'react-icons/fa'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import Reviews from '../components/Reviews'
import { get_product } from '../store/reducers/homeReducer'
import { add_to_card, messageClear, add_to_wishlist } from '../store/reducers/cardReducer'
import toast from 'react-hot-toast'

const Details = () => {

    const navigate = useNavigate()
    const { slug } = useParams()
    const dispatch = useDispatch()
    const { product, relatedProducts, moreProducts } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.card)

    const [image, setImage] = useState('')
    const [state, setState] = useState('reviews')
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        }
    }

    const [quantity, setQuantity] = useState(1)

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Out of stock')
        } else {
            setQuantity(quantity + 1)
        }
    }

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const add_card = () => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id
            }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }

    }

    useEffect(() => {
        dispatch(get_product(slug))
    }, [slug])
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])

    const buy = () => {
        let price = 0;
        if (product.discount !== 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100)
        } else {
            price = product.price
        }
        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price: quantity * (price - Math.floor((price * 5) / 100)),
                products: [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ]
        navigate('/shipping', {
            state: {
                products: obj,
                price: price * quantity,
                shipping_fee: 85,
                items: 1
            }
        })
    }
    return (
        <div>
            <Headers />
            <div className='bg-[url("http://localhost:3000/images/banner/order.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>Shop.my</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-slate-100 py-5 mb-5'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                        <Link to='/'>Home</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <Link to='/'>{product.category}</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <span>{product.name}</span>
                    </div>
                </div>
            </div>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-8'>
                        <div>
                            <div className='p-5 border'>
                                <img className='h-[500px] w-full' src={image ? image : product.images?.[0]} alt="" />
                            </div>
                            <div className='py-3'>
                                {
                                    product.images && <Carousel
                                        autoPlay={true}
                                        infinite={true}
                                        responsive={responsive}
                                        transitionDuration={500}
                                    >
                                        {
                                            product.images.map((img, i) => {
                                                return (
                                                    <div key={i} onClick={() => setImage(img)}>
                                                        <img className='h-[120px] cursor-pointer' src={img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-3xl text-slate-600 font-bold'>
                                <h2>{product.name}</h2>
                            </div>
                            <div className='flex justify-start items-center gap-4'>
                                <div className='flex text-xl'>
                                    <Ratings ratings={product.rating} />
                                </div>
                                <span className='text-green-500'>(23 reviews)</span>
                            </div>
                            <div className='text-2xl text-red-500 font-bold flex gap-3'>
                                {
                                    product.discount !== 0 ? <>
                                        <h2 className='line-through'>${product.price}</h2>
                                        <h2>${product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%)</h2>
                                    </> : <h2>Price : ${product.price}</h2>
                                }
                            </div>
                            <div className='text-slate-600'>
                                <p>{product.description}</p>
                            </div>
                            <div className='flex gap-3 pb-10 border-b'>
                                {
                                    product.stock ? <>
                                        <div className='flex bg-slate-200 h-[50px] justify-center items-center text-xl'>
                                            <div onClick={dec} className='px-6 cursor-pointer'>-</div>
                                            <div className='px-5'>{quantity}</div>
                                            <div onClick={inc} className='px-6 cursor-pointer'>+</div>
                                        </div>
                                        <div>
                                            <button onClick={add_card} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-purple-500 text-white'>Add To Card</button>
                                        </div>
                                    </> : ''
                                }
                                <div>
                                    <div onClick={add_wishlist} className='h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white'>
                                        <AiFillHeart />
                                    </div>
                                </div>
                            </div>
                            <div className='flex py-5 gap-5'>
                                <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                                    <span>Availability</span>
                                    <span>Share on</span>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <span className={`text-${product.stock ? 'green' : 'red'}-500`}>
                                        {product.stock ? `In Stock(${product.stock})` : 'Out of Stock'}
                                    </span>
                                    <ul className='flex justify-start items-center gap-3'>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white' href="#"><FaFacebookF /></a>
                                        </li>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white' href="#"><AiOutlineTwitter /></a>
                                        </li>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white' href="#"><FaLinkedin /></a>
                                        </li>
                                        <li>
                                            <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white' href="#"><AiFillGithub /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                {
                                    product.stock ? <button onClick={buy} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-emerald-500 text-white'>Buy Now</button> : ""
                                }
                                <Link to={`/dashboard/chat/${product.sellerId}`} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-lime-500/40 bg-lime-500 text-white block'>Chat Seller</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='flex flex-wrap'>
                        <div className='w-[72%] md-lg:w-full'>
                            <div className='pr-4 md-lg:pr-0'>
                                <div className='grid grid-cols-2'>
                                    <button onClick={() => setState('reviews')} className={`py-1 hover:text-white px-5 hover:bg-green-500 ${state === 'reviews' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Reviews</button>
                                    <button onClick={() => setState('description')} className={`py-1 px-5 hover:text-white hover:bg-green-500 ${state === 'description' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Description</button>
                                </div>
                                <div>
                                    {
                                        state === 'reviews' ? <Reviews product={product} /> : <p className='py-5 text-slate-600'>{product.description}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-[28%] md-lg:w-full'>
                            <div className='pl-4 md-lg:pl-0'>
                                <div className='px-3 py-2 text-slate-600 bg-slate-200'>
                                    <h2> From {product.shopName}</h2>
                                </div>
                                <div className='flex flex-col gap-5 mt-3 border p-3'>
                                    {
                                        moreProducts.map((p, i) => {
                                            return (
                                                <Link className='block'>
                                                    <div className='relative h-[270px]'>
                                                        <img className='w-full h-full' src={p.images[0]} />
                                                        {
                                                            p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div>
                                                        }
                                                    </div>
                                                    <h2 className='text-slate-600 py-1'>{p.name}</h2>
                                                    <div className='flex gap-2'>
                                                        <h2 className='text-[#6699ff] text-lg font-bold'>${p.price}</h2>
                                                        <div className='flex items-center gap-2'>
                                                            <Ratings ratings={p.rating} />
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-2xl py-8 text-slate-600'>Related Products</h2>
                    <div>
                        <Swiper
                            slidesPerView='auto'
                            breakpoints={{
                                1280: {
                                    slidesPerView: 3
                                },
                                565: {
                                    slidesPerView: 2
                                }
                            }}
                            spaceBetween={25}
                            loop={true}
                            pagination={{
                                clickable: true,
                                el: '.custom_bullet'
                            }}
                            modules={[Pagination]}
                            className='mySwiper'
                        >
                            {
                                relatedProducts.map((p, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <Link className='block'>
                                                <div className='relative h-[270px]'>
                                                    <div className='w-full h-full'>
                                                        <img className='w-full h-full' src={p.images[0]} />
                                                        <div className='absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500'></div>
                                                    </div>
                                                    {
                                                        p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div>
                                                    }
                                                </div>
                                                <div className='p-4 flex flex-col gap-1'>
                                                    <h2 className='text-slate-600 text-lg font-semibold'>{p.name}</h2>
                                                    <div className='flex justify-start items-center gap-3'>
                                                        <h2 className='text-[#6699ff] text-lg font-bold'>${p.price}</h2>
                                                        <div className='flex'>
                                                            <Ratings ratings={p.rating} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <div className='w-full flex justify-center items-center py-10'>
                        <div className='custom_bullet justify-center gap-3 !w-auto'></div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Details