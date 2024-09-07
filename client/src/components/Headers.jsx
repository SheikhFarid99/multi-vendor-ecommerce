import React, { useEffect, useState } from 'react'
import { GrMail } from 'react-icons/gr'
import { IoIosCall } from 'react-icons/io'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaLinkedinIn, FaFacebookF, FaUser, FaLock, FaList } from 'react-icons/fa'
import { AiOutlineTwitter, AiFillGithub, AiFillHeart, AiFillShopping } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer'

const Headers = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { card_product_count, wishlist_count } = useSelector(state => state.card)

    const { pathname } = useLocation()
    const [showShidebar, setShowShidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }
    const redirect_card_page = () => {
        if (userInfo) {
            navigate(`/card`)
        } else {
            navigate(`/login`)
        }
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }
    }, [userInfo])
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
                                <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                                    <img src="http://localhost:3000/images/language.png" alt="" />
                                    <span><MdOutlineKeyboardArrowDown /></span>
                                    <ul className='absolute invisible transition-all to-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                                        <li>Bangla</li>
                                        <li>English</li>
                                    </ul>
                                </div>
                                {
                                    userInfo ? <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                        <span><FaUser /></span>
                                        <span>{userInfo.name}</span>
                                    </Link> : <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                        <span><FaLock /></span>
                                        <span>Login</span>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-white'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
                        <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                            <div className='flex justify-between items-center'>
                                <Link to='/'>
                                    <img src="http://localhost:3000/images/logo.png" alt="logo" />
                                </Link>
                                <div className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden' onClick={() => setShowShidebar(false)}>
                                    <span><FaList /></span>
                                </div>
                            </div>
                        </div>
                        <div className='md-lg:w-full w-9/12'>
                            <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                                <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden'>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/shops' className={`p-2 block ${pathname === '/shop' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/blog' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Blog</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/about' ? 'text-[#7fad39]' : 'text-slate-600'}`}>About</Link>
                                    </li>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/contact' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Contact</Link>
                                    </li>
                                </ul>
                                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                                    <div className='flex justify-center gap-5'>
                                        <div onClick={()=>navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-red-500'><AiFillHeart /></span>
                                            {
                                                wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                    {wishlist_count}
                                                </div>
                                            }
                                        </div>
                                        <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-orange-500'><AiFillShopping /></span>
                                            {
                                                card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                    {
                                                        card_product_count
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md-lg:block'>
                <div onClick={() => setShowShidebar(true)} className={`fixed duration-200 transition-all ${showShidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}>
                </div>
                <div className={`w-[300px] z-[9999] transition-all duration-200 fixed  ${showShidebar ? '-left-[300px]' : 'left-0'} top-0 overflow-y-auto bg-white h-screen py-6 px-8`}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img src="http://localhost:3000/images/logo.png" alt="logo" />
                        </Link>
                        <div className='flex justify-star items-center gap-10'>
                            <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute'>
                                <img src="http://localhost:3000/images/language.png" alt="" />
                                <span><MdOutlineKeyboardArrowDown /></span>
                                <ul className='absolute invisible transition-all to-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                                    <li>Bangla</li>
                                    <li>English</li>
                                </ul>
                            </div>
                            {
                                userInfo ? <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                    <span><FaUser /></span>
                                    <span>{userInfo.name}</span>
                                </Link> : <div className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                    <span><FaLock /></span>
                                    <span>Login</span>
                                </div>
                            }
                        </div>
                        <ul className='flex flex-col justify-start items-start  text-md font-semibold uppercase'>
                            <li>
                                <Link className={`py-2 block ${pathname === '/' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Home</Link>
                            </li>
                            <li>
                                <Link to={'/shops'} className={`py-2 block ${pathname === '/shops' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Shop</Link>
                            </li>
                            <li>
                                <Link className={`py-2 block ${pathname === '/blog' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Blog</Link>
                            </li>
                            <li>
                                <Link className={`py-2 block ${pathname === '/about' ? 'text-[#7fad39]' : 'text-slate-600'}`}>About</Link>
                            </li>
                            <li>
                                <Link className={`py-2 block ${pathname === '/contact' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Contact</Link>
                            </li>
                        </ul>
                        <div className='flex justify-start  items-center gap-4'>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><AiOutlineTwitter /></a>
                            <a href="#"><FaLinkedinIn /></a>
                            <a href="#"><AiFillGithub /></a>
                        </div>
                        <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
                            <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                                <span><IoIosCall /></span>
                            </div>
                            <div className='flex justify-end flex-col gap-1'>
                                <h2 className='text-sm font-medium text-slate-700'>+8803242343243</h2>
                                <span className='text-xs'>support 33/45 time</span>
                            </div>
                        </div>
                        <ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
                            <li className='flex justify-start items-center gap-2  text-sm'>
                                <span><GrMail /></span>
                                <span>learnwithproject@gmail.com</span>
                            </li>
                            <span className='text-sm'>Multi vendor ecommerce</span>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='flex w-full flex-wrap md-lg:gap-8'>
                    <div className='w-3/12 md-lg:w-full'>
                        <div className='bg-white relative'>
                            <div onClick={() => setCategoryShow(!categoryShow)} className='h-[50px] bg-violet-400 text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer'>
                                <div className="flex justify-center items-center gap-3">
                                    <span><FaList /></span>
                                    <span>All Category</span>
                                </div>
                                <span className='pt-1'><MdOutlineKeyboardArrowDown /></span>
                            </div>
                            <div className={`${categoryShow ? 'h-0' : 'h-[400px]'} overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] bg-white w-full border-x`}>
                                <ul className='py-2 text-slate-600 font-medium h-full overflow-auto'>
                                    {
                                        categorys.map((c, i) => {
                                            return (
                                                <li key={i} className='flex justify-start items-center gap-2 px-[24px] py-[6px]'>
                                                    <img src={c.image} className='w-[30px] h-[30px] rounded-full overflow-hidden' alt={c.name} />
                                                    <Link to={`/products?category=${c.name}`} className='text-sm block'>{c.name}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
                        <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
                            <div className='w-8/12 md-lg:w-full'>
                                <div className='flex border h-[50px] items-center relative gap-5'>
                                    <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden'>
                                        <select onChange={(e) => setCategory(e.target.value)} className='w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none' name="" id="">
                                            <option value="">Select category</option>
                                            {
                                                categorys.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)
                                            }
                                        </select>
                                    </div>
                                    <input className='w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full' onChange={(e) => setSearchValue(e.target.value)} type="text" name="" id="" placeholder='what do you need' />
                                    <button onClick={search} className='bg-violet-400 right-0 absolute px-8 h-full font-semibold uppercase text-white'>Search</button>
                                </div>
                            </div>
                            <div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0'>
                                <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
                                    <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center'>
                                        <span><IoIosCall /></span>
                                    </div>
                                    <div className='flex justify-end flex-col gap-1'>
                                        <h2 className='text-md font-medium text-slate-700'>+8803242343243</h2>
                                        <span className='text-sm'>support 33/45 time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Headers