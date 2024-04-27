import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { overrideStyle } from '../../utils/utils'
import { PropagateLoader } from 'react-spinners'
import { add_banner, messageClear, get_banner, update_banner } from '../../store/Reducers/bannerReducer'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

const AddBanner = () => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const { productId } = useParams()
    const [imageShow, setImageShow] = useState('')
    const [image, setImage] = useState('')

    const { loader, successMessage, errorMessage, banner } = useSelector(state => state.banner)

    const imageHandle = (e) => {
        const files = e.target.files
        const length = files.length;

        if (length > 0) {
            setImage(files[0])
            setImageShow(URL.createObjectURL(files[0]))
        }
    }

    const add = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('productId', productId)
        formData.append('image', image)
        dispatch(add_banner(formData))
    }

    const update = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)
        dispatch(update_banner({info : formData, bannerId : banner._id }))
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setImageShow("")
            setImage('')

        }
    }, [successMessage, errorMessage])


    useEffect(() => {
        dispatch(get_banner(productId))
    }, [productId])

    return (
        <div className='px-2 lg:px-7 pt-5 '>
            <div className='w-full p-4  bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add banner</h1>
                    <Link className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 ' to='/seller/dashboard/banners'>Banners</Link>
                </div>
                {
                    !banner && <div>
                        <form onSubmit={add}>
                            <div className='mb-6'>
                                <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]' htmlFor="image">
                                    <span className='text-4xl'><FaCloudUploadAlt /></span>
                                    <span>select banner image</span>
                                </label>
                                <input required onChange={imageHandle} className='hidden' type="file" id='image' />
                            </div>
                            {
                                imageShow && <div className='mb-4'>
                                    <img className='w-full h-auto' src={imageShow} alt="image" />
                                </div>
                            }
                            <button disabled={loader ? true : false} className='bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                                {
                                    loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add banner'
                                }
                            </button>
                        </form>
                    </div>
                }
                {
                    banner && <div>
                        {
                            <div className='mb-4'>
                                <img className='w-full h-auto' src={banner.banner} alt="image" />
                            </div>
                        }
                        <form onSubmit={update}>
                            <div className='mb-6'>
                                <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]' htmlFor="image">
                                    <span className='text-4xl'><FaCloudUploadAlt /></span>
                                    <span>select banner image</span>
                                </label>
                                <input required onChange={imageHandle} className='hidden' type="file" id='image' />
                            </div>
                            {
                                imageShow && <div className='mb-4'>
                                    <img className='w-full h-auto' src={imageShow} alt="image" />
                                </div>
                            }
                            <button disabled={loader ? true : false} className='bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                                {
                                    loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'update banner'
                                }
                            </button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default AddBanner