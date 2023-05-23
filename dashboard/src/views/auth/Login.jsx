import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineGooglePlus, AiOutlineGithub } from 'react-icons/ai'
import { FiFacebook } from 'react-icons/fi'
import { CiTwitter } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { PropagateLoader } from 'react-spinners'
import { overrideStyle } from '../../utils/utils'
import { messageClear, seller_login } from '../../store/Reducers/authReducer'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loader, errorMessage, successMessage } = useSelector(state => state.auth)
    const [state, setSatate] = useState({
        email: '',
        password: ''
    })
    const inputHandle = (e) => {
        setSatate({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_login(state))
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            navigate('/')
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])
    return (
        <div className='min-w-screen min-h-screen bg-[#161d31] flex justify-center items-center'>
            <div className='w-[350px] text-[#d0d2d6] p-2'>
                <div className='bg-[#283046] p-4 rounded-md'>
                    <h2 className='text-xl mb-3'>Welcome to e-commerce</h2>
                    <p className='text-sm mb-3'>Please signin to your account and start your bussiness</p>
                    <form onSubmit={submit}>
                        <div className='flex flex-col w-full gap-1 mb-3'>
                            <label htmlFor="email">Email</label>
                            <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type="text" name='email' placeholder='email' id='email' required />
                        </div>
                        <div className='flex flex-col w-full gap-1 mb-5'>
                            <label htmlFor="password">Password</label>
                            <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden' type="password" name='password' placeholder='password' id='password' required />
                        </div>
                        <button disabled={loader ? true : false} className='bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                            {
                                loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Login'
                            }
                        </button>
                        <div className='flex items-center mb-3 gap-3 justify-center'>
                            <p>Already have an account ? <Link to='/register'>Signup here</Link></p>
                        </div>
                        <div className='w-full flex justify-center items-center mb-3'>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                            <div className='w-[10%] flex justify-center items-center'>
                                <span className='pb-1'>Or</span>
                            </div>
                            <div className='w-[45%] bg-slate-700 h-[1px]'></div>
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><AiOutlineGooglePlus /></span>
                            </div>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-indigo-700 shadow-lg hover:shadow-indigo-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><FiFacebook /></span>
                            </div>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-cyan-700 shadow-lg hover:shadow-cyan-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><CiTwitter /></span>
                            </div>
                            <div className='w-[35px] h-[35px] flex rounded-md bg-purple-700 shadow-lg hover:shadow-purple-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                <span><AiOutlineGithub /></span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login