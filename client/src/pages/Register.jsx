import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { FaFacebookF } from 'react-icons/fa'
import FadeLoader from 'react-spinners/FadeLoader'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineGoogle } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

import { customer_register, messageClear } from '../store/reducers/authReducer'

const Register = () => {

    const navigate = useNavigate()
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [otp_res, set_otp_res] = useState(false)
    const [res, setRes] = useState(false)

    const [otpData, setOtpData] = useState({
        number1: "",
        number2: "",
        number3: "",
        number4: "",
    });


    const otpHandle = (e) => {
        setOtpData({
            ...otpData,
            [e.target.name]: e.target.value,
        });
    };


    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const register = (e) => {
        e.preventDefault()
        dispatch(customer_register(state))
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
        if (userInfo) {
            navigate('/')
        }
    }, [successMessage, errorMessage])

    // const user_register = async (e) => {
    //     e.preventDefault()
    //     try {

    //         setLoader(true)
    //         const { data } = await api.post('/api/user-register', state)
    //         setLoader(false)
    //         setRes(true)
    //         toast.success(data.message)
    //     } catch (error) {
    //         setLoader(false)
    //         toast.error(error.response.data.message)
    //     }
    // }


    // useEffect(() => {
    //     if (res) {
    //         const inputs = document.querySelectorAll(".otp_field");
    //         inputs.forEach((input, index1) => {
    //             input.addEventListener("keyup", (e) => {
    //                 const currentInput = input,
    //                     nextInput = input.nextElementSibling,
    //                     prevInput = input.previousElementSibling;
    //                 if (currentInput.value.length > 1) {
    //                     currentInput.value = "";
    //                     return;
    //                 }
    //                 if (
    //                     nextInput &&
    //                     nextInput.hasAttribute("disabled") &&
    //                     currentInput.value !== ""
    //                 ) {
    //                     nextInput.removeAttribute("disabled");
    //                     nextInput.focus();
    //                 }
    //                 if (e.key === "Backspace") {
    //                     inputs.forEach((input, index2) => {
    //                         if (index1 <= index2 && prevInput) {
    //                             input.setAttribute("disabled", true);
    //                             input.value = "";
    //                             prevInput.focus();
    //                         }
    //                     });
    //                 }
    //                 if (!inputs[3].disabled && inputs[3].value !== "") {
    //                     return;
    //                 }
    //             });
    //         });
    //         window.addEventListener("load", () => inputs[0].focus());
    //     }
    // }, [res]);


    // const otp_submit = async (e) => {

    //     e.preventDefault();

    //     let otp = otpData.number1 + otpData.number2 + otpData.number3 + otpData.number4

    //     otp = parseInt(otp);

    //     try {
    //         set_otp_res(true)
    //         const { data } = await api.post(`/api/otp-submit`, { otp })
    //         set_otp_res(false)
    //         localStorage.setItem('canva_token', data.token)
    //         window.location.href = '/'
    //     } catch (error) {
    //         set_otp_res(false)
    //         console.log(error)
    //         toast.error(error?.response?.data?.message)
    //     }
    // };

    return (
        <div>
            {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            }
            <Headers />
            <div className='bg-slate-200 mt-4'>
                <div className='w-full justify-center items-center p-10 sm:p-5'>
                    <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1  w-[60%] md-lg:w-full md:w-full sm:w-full mx-auto bg-white rounded-md'>
                        <div className='px-8 py-8 md-lg:w-full md:w-full sm:w-full'>
                            <h2 className='text-center w-full text-xl text-slate-600 font-bold'>Register</h2>
                            <div>
                                <form onSubmit={register} className='text-slate-600'>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="name">Name</label>
                                        <input onChange={inputHandle} value={state.name} type="text" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='name' name='name' placeholder='name' required />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input onChange={inputHandle} value={state.email} type="email" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='email' name='email' placeholder='email' required />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <label htmlFor="password">Passoword</label>
                                        <input onChange={inputHandle} value={state.password} type="password" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md' id='password' name='password' placeholder='password' required />
                                    </div>
                                    <button className='px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md'>Register</button>
                                </form>
                                <div className='flex justify-center items-center py-2'>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                    <span className='px-3 text-slate-600'>or</span>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                </div>
                                <button className='px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><FaFacebookF /></span>
                                    <span>Facebook</span>
                                </button>
                                <button className='px-8 w-full py-2 bg-orange-500 shadow hover:shadow-orange-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span><AiOutlineGoogle /></span>
                                    <span>Google</span>
                                </button>
                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p>You have a account?<Link className='text-blue-500' to='/login'> Login</Link></p>
                            </div>
                            {/* <div className='text-center text-slate-600 pt-1'>
                                <p> <Link className='text-blue-500' to='/login'>Login</Link> seller account</p>
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

export default Register