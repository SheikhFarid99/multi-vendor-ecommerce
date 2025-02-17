import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Categorys = () => {

    const { categorys } = useSelector(state => state.home)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
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
    return (
        <div className='w-full mx-auto relative'>

            <Carousel
                //autoPlay={true}
                infinite={true}
                arrows={true}
                responsive={responsive}
                transitionDuration={500}
            >
                {
                    categorys.map((c, i) => <Link className='block p-[2px] border  w-full bg-white aspect-square' key={i} to={`/products?category=${c.name}`}>
                        <div className='w-full hover:shadow-[1px_3px_19px_1px_rgba(194,188,194,1)]  h-full gap-y-2 flex-col relative  flex justify-center items-center'>
                            <img src={c.image} className='w-[70%] aspect-square' alt="image" />
                            <div className='bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                                <span className='py-[2px] px-6 bg-[#3330305d] text-white'>{c.name}</span>
                            </div>
                        </div>
                    </Link>)
                }
            </Carousel>

        </div>
    )
}

export default Categorys