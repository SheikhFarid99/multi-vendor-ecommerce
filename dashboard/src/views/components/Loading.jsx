import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
const Loading = () => {
    return (
        <div className='bg-[#283046] flex justify-center items-center w-screen h-screen'>
            <PuffLoader color={'#D0D2D6'} loading={true} size={150} />
        </div>
    )
}

export default Loading