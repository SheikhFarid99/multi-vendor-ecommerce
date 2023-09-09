import React, { forwardRef, useEffect, useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import toast from 'react-hot-toast'
import moment from 'moment'

import { useSelector, useDispatch } from 'react-redux'
import { get_payment_request, confirm_payment_request,messageClear } from '../../store/Reducers/PaymentReducer'

function handleOnWheel({ deltaY }) {
  console.log('handleOnWheel', deltaY)
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
))

const PaymentRequest = () => {

  const dispatch = useDispatch()

  const { successMessage, errorMessage, loader, pendingWithdrows } = useSelector(state => state.payment)


  useEffect(() => {
    dispatch(get_payment_request())
  }, [])
  const [paymentId, setPaymentId] = useState('')
  const confirm_request = (id) => {
    setPaymentId(id)
    dispatch(confirm_payment_request(id))
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
  }, [errorMessage, successMessage])

  const Row = ({ index, style }) => {
    return (
      <div style={style} className='flex text-sm'>
        <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
        <div className='w-[25%] p-2 whitespace-nowrap'>${pendingWithdrows[index]?.amount}</div>
        <div className='w-[25%] p-2 whitespace-nowrap'>
          <span className='py-[1px] px-[5px] bg-slate-700 text-blue-500 rounded-md text-xs'>{pendingWithdrows[index]?.status}</span>
        </div>
        <div className='w-[25%] p-2 whitespace-nowrap'>{moment(pendingWithdrows[index]?.createdAt).format('LL')}</div>
        <div className='w-[25%] p-2 whitespace-nowrap'>
          <button disabled={loader} onClick={() => confirm_request(pendingWithdrows[index]?._id)} className='bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm'>{(loader && paymentId === pendingWithdrows[index]?._id) ? 'loading..' : 'Confirm'}</button>
        </div>
      </div>
    )
  }

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4  bg-[#283046] rounded-md text-[#d0d2d6]'>
        <h2 className='text-xl font-medium pb-5'>Withdrawal request</h2>
        <div className='w-full'>
          <div className='w-full overflow-x-auto'>
            <div className='flex bg-[#161d31] uppercase text-xs min-w-[340px]'>
              <div className='w-[25%] p-2'>No</div>
              <div className='w-[25%] p-2'>Amount</div>
              <div className='w-[25%] p-2'>status</div>
              <div className='w-[25%] p-2'>date</div>
              <div className='w-[25%] p-2'>action</div>
            </div>
            {
              <List
                style={{ minWidth: '340px', overflowX: 'hidden' }}
                className='List'
                height={350}
                itemCount={pendingWithdrows.length}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentRequest