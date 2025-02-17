import React, { useState,useEffect } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { FaFacebookF } from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import { AiOutlineGoogle } from 'react-icons/ai'
import FadeLoader from 'react-spinners/FadeLoader'
import { useSelector, useDispatch } from 'react-redux'
import { customer_login, messageClear } from '../store/reducers/authReducer'
import toast from 'react-hot-toast'

const Login = () => {

    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const login = (e) => {
        e.preventDefault()
        dispatch(customer_login(state))
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
        if(userInfo){
            navigate('/')
        }
    }, [successMessage, errorMessage])

    return (
        <div>
            <Headers />
            {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            }
            <div className='bg-slate-200 mt-4'>
                <div className='max-w-[1440px] mx-auto px-16 sm:px-5 md-lg:px-12 md:px-10 justify-center items-center p-10 sm:p-5'>
                    <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1  w-[60%] md-lg:w-full md:w-full sm:w-full mx-auto bg-white rounded-md'>
                        <div className='px-8 py-8 md-lg:w-full md:w-full sm:w-full'>
                            <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Login</h2>
                            <div>
                                <form onSubmit={login} className='text-slate-600'>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input onChange={inputHandle} value={state.email} type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='email' name='email' placeholder='email' />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <label htmlFor="password">Passoword</label>
                                        <input onChange={inputHandle} value={state.password} type="password" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='password' name='password' placeholder='password' />
                                    </div>
                                    <button className='px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md'>Login</button>
                                </form>
                                <div className='flex justify-center items-center py-2'>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                    <span className='px-3 text-slate-600'>or</span>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                </div>
                                <button className='px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaFacebookF /></span>
                                    <span>Login with Facebook</span>
                                </button>
                                <button className='px-8 w-full py-2 bg-orange-500 shadow hover:shadow-orange-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><AiOutlineGoogle /></span>
                                    <span>Login with Facebook</span>
                                </button>
                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p>You have no account? <Link  className='text-blue-500' to='/register'> Register</Link> </p>
                            </div>
                            {/* <div className='text-center text-slate-600 pt-1'>
                                <p> <Link  className='text-blue-500' to='/register'>Register</Link> seller account</p>
                            </div> */}
                        </div>
                        <div className='w-full h-full py-4 pr-4 block md:hidden'>
                            <img className='w-full h-[95%]' src="/images/login.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login