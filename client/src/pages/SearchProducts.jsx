import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Range } from 'react-range'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import Products from '../components/products/Products'
import { AiFillStar } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'
import { BsFillGridFill } from 'react-icons/bs'
import { FaThList } from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts'
import Pagination from '../components/Pagination'
import { price_range_product, query_products } from '../store/reducers/homeReducer'
import { useDispatch, useSelector } from 'react-redux'

const SearchProducts = () => {

    let [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const searchValue = searchParams.get('value')
    const { products, totalProduct, latest_product, priceRange, parPage } = useSelector(state => state.home)

    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(1)
    const [styles, setStyles] = useState('grid')
    const [filter, setFilter] = useState(true)
    const [state, setState] = useState({ values: [50, 100] })
    const [rating, setRatingQ] = useState('')
    const [sortPrice, setSortPrice] = useState('')

    useEffect(() => {
        dispatch(price_range_product())
    }, [])
    const [rangeData, setRangeData] = useState(null)

    useEffect(() => {

        if (priceRange.low === priceRange.high) {
            setRangeData({
                low: priceRange.low,
                high: priceRange.high + 100
            })
        } else {
            setRangeData({
                low: priceRange.low,
                high: priceRange.high
            })
        }
        setState({ values: [priceRange.low, priceRange.high] })

    }, [priceRange])

    useEffect(() => {
        dispatch(
            query_products({
                low: state.values[0] || '',
                high: state.values[1] || '',
                category,
                rating,
                sortPrice,
                pageNumber,
                searchValue
            })
        )
    }, [state.values[0], state.values[1], category, rating, pageNumber, sortPrice, searchValue])

    const resetRating = () => {
        setRatingQ('')
        dispatch(query_products({
            low: state.values[0],
            high: state.values[1],
            category,
            rating: '',
            sortPrice,
            pageNumber
        }))
    }
    return (
        <div>
            <Headers />
            <div className='max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10'>
                <section style={{ backgroundImage: 'url("/images/banner/shop.gif")' }} className='h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                    <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                        <div className='w-full h-full mx-auto'>
                            <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                                <h2 className='text-3xl font-bold'>Shop.my</h2>
                                <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                    <Link to='/'>Home</Link>
                                    <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                                    <span>Products</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className='py-16'>
                <div className='max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10'>
                    <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
                        <button onClick={() => setFilter(!filter)} className='text-center w-full py-2 px-3 bg-indigo-500 text-white'>Filter Product</button>
                    </div>
                    <div className='w-full flex flex-wrap'>
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0'}`}>
                            <div className='py-2 flex flex-col gap-5'>
                                <h2 className='text-3xl font-bold mb-3 text-slate-600'>Price</h2>
                                {
                                    rangeData && <Range
                                        step={1}
                                        min={rangeData?.low}
                                        max={rangeData?.high}
                                        values={state.values}
                                        onChange={(values) => setState({ values })}
                                        renderTrack={({ props, children }) => (
                                            <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-default'>
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div className='w-[15px] h-[15px] bg-blue-500 rounded-full' {...props} />

                                        )}
                                    />
                                }
                                <div>
                                    <span className='text-red-500 font-bold text-lg'>${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}</span>
                                </div>
                            </div>
                            <div className='py-3 flex flex-col gap-4'>
                                <h2 className='text-3xl font-bold mb-3 text-slate-600'>Rating</h2>
                                <div className='flex flex-col gap-3'>
                                    <div onClick={() => setRatingQ(5)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(4)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(3)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(2)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={() => setRatingQ(1)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                    <div onClick={resetRating} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                        <span><CiStar /></span>
                                    </div>
                                </div>
                            </div>
                            <div className='py-5 flex flex-col gap-4 md:hidden'>
                                <Products title="Latest Products" products={latest_product} />
                            </div>
                        </div>
                        <div className='w-9/12 md-lg:w-8/12 md:w-full'>
                            <div className='pl-8 md:pl-0'>
                                <div className='py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                                    <h2 className='text-lg font-medium text-slate-600'>{totalProduct} Products</h2>
                                    <div className='flex justify-center items-center gap-3'>
                                        <select onChange={(e) => setSortPrice(e.target.value)} className='p-1 border outline-0 text-slate-600 font-semibold' name="" id="">
                                            <option value="">Sort By</option>
                                            <option value="low-to-high">Low to High Price</option>
                                            <option value="high-to-low">High to Low Price</option>
                                        </select>
                                        <div className='flex justify-center items-start gap-4 md-lg:hidden'>
                                            <div onClick={() => setStyles('grid')} className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                <BsFillGridFill />
                                            </div>
                                            <div onClick={() => setStyles('list')} className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                <FaThList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='pb-8'>
                                    <ShopProducts products={products} styles={styles} />
                                </div>
                                <div>
                                    {
                                        totalProduct > parPage && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProduct} parPage={parPage} showItem={Math.floor(totalProduct / parPage)} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default SearchProducts