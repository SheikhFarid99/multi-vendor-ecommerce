import React from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {

    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    let dif = totalPage - pageNumber;
    if(showItem>6){
        showItem = 5
    }
    if (dif <= showItem) {
        startPage = totalPage - showItem
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage

    if (startPage <= 0) {
        startPage = 1
    }
    const createBtn = () => {
        const btns = []

        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li onClick={() => setPageNumber(i)} className={`
                    ${pageNumber === i ? 'bg-slate-300 shadow-lg shadow-slate-300/50 text-slate-800' : 'bg-slate-300 hover:bg-slate-300 shadow-lg hover:shadow-slate-300/50 hover:text-slate-800 text-slate-800'} w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`
                }>
                    {i}
                </li>
            )
        }
        return btns
    }

    return (
        <ul className='flex gap-3'>
            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-slate-800 cursor-pointer'>
                    <BsChevronDoubleLeft />
                </li>
            }
            {
                createBtn()
            }
            {
                pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)} className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-slate-800 cursor-pointer'>
                    <BsChevronDoubleRight />
                </li>
            }
        </ul>
    )
}

export default Pagination