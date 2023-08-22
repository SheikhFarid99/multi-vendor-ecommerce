import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { socket } from '../utils/utils'
import { useSelector,useDispatch } from 'react-redux'
import {updateCustomer,updateSellers,activeStatus_update} from '../store/Reducers/chatReducer'

const MainLayout = () => {

  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (userInfo && userInfo.role === 'seller') {
      socket.emit('add_seller', userInfo._id, userInfo)
    } else {
      socket.emit('add_admin', userInfo)
    }
  }, [userInfo])

  useEffect(()=>{
    socket.on('activeCustomer',(customers)=>{
      dispatch(updateCustomer(customers))
    })
    socket.on('activeSeller',(sellers)=>{
      dispatch(updateSellers(sellers))
    })
    socket.on('activeAdmin',(data)=>{
      dispatch(activeStatus_update(data))
    })
  },[])
  return (
    <div className='bg-[#161d31] w-full min-h-screen'>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout