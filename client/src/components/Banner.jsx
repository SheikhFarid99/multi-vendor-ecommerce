import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { get_banners } from '../store/reducers/homeReducer'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Banner = () => {

    const dispatch = useDispatch()
    const { banners } = useSelector(state => state.home)
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }

    useEffect(() => {
        dispatch(get_banners())
    }, [])
    return (
        <div className='w-full md-lg:mt-6'>
            <div className='max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10'>
                <div className='w-full flex flex-wrap md-lg:gap-8'>
                    <div className='w-full'>
                        <div className='my-8'>
                            <Carousel
                                autoPlay={true}
                                infinite={true}
                                arrows={true}
                                showDots={true}
                                responsive={responsive}
                            >
                                {
                                    banners && banners.length > 0 && banners.map((b, i) => <Link className='lg-md:h-[440px] h-auto w-full block' key={i} to={`/product/details/${b.link}`}>
                                        <img className='w-full h-full' src={b.banner} alt="" />
                                    </Link>)
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner