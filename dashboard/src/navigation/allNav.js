import { AiFillDashboard, AiOutlineShoppingCart,AiOutlinePlus } from 'react-icons/ai'
import { BiCategory, BiLoaderCircle } from 'react-icons/bi'
import { FiUsers } from 'react-icons/fi'
import { CiChat1 } from 'react-icons/ci'
import { BsCurrencyDollar,BsChat } from 'react-icons/bs'
import { RiProductHuntLine } from 'react-icons/ri'
export const allNav = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <AiFillDashboard />,
        role: 'admin',
        path: '/admin/dashboard'
    },
    {
        id: 2,
        title: 'Orders',
        icon: <AiOutlineShoppingCart />,
        role: 'admin',
        path: '/admin/dashboard/orders'
    },
    {
        id: 3,
        title: 'Category',
        icon: <BiCategory />,
        role: 'admin',
        path: '/admin/dashboard/category'
    },
    {
        id: 4,
        title: 'Sellers',
        icon: <FiUsers />,
        role: 'admin',
        path: '/admin/dashboard/sellers'
    },
    {
        id: 5,
        title: 'Payment request',
        icon: <BsCurrencyDollar />,
        role: 'admin',
        path: '/admin/dashboard/payment-request'
    },
    {
        id: 6,
        title: 'Deactive Sellers',
        icon: <FiUsers />,
        role: 'admin',
        path: '/admin/dashboard/deactive-sellers'
    },
    {
        id: 7,
        title: 'Sellers Request',
        icon: <BiLoaderCircle />,
        role: 'admin',
        path: '/admin/dashboard/sellers-request'
    },
    {
        id: 8,
        title: 'Chat Seller',
        icon: <CiChat1 />,
        role: 'admin',
        path: '/admin/dashboard/chat-sellers'
    },
    {
        id: 9,
        title: 'Dashboard',
        icon: <AiFillDashboard />,
        role: 'seller',
        path: '/seller/dashboard'
    },
    {
        id: 10,
        title: 'Add Product',
        icon: <AiOutlinePlus />,
        role: 'seller',
        path: '/seller/dashboard/add-product'
    },
    {
        id: 11,
        title: 'All Product',
        icon: <RiProductHuntLine />,
        role: 'seller',
        path: '/seller/dashboard/products'
    },
    {
        id: 12,
        title: 'Discount Product',
        icon: <RiProductHuntLine />,
        role: 'seller',
        path: '/seller/dashboard/discount-products'
    },
    {
        id: 13,
        title: 'Orders',
        icon: <AiOutlineShoppingCart />,
        role: 'seller',
        path: '/seller/dashboard/orders'
    },
    {
        id: 14,
        title: 'Payments',
        icon: <BsCurrencyDollar />,
        role: 'seller',
        path: '/seller/dashboard/payments'
    },
    {
        id: 15,
        title: 'Chat Customer',
        icon: <BsChat />,
        role: 'seller',
        path: '/seller/dashboard/chat-customer'
    },
    {
        id: 16,
        title: 'Chat Support',
        icon: <CiChat1 />,
        role: 'seller',
        path: '/seller/dashboard/chat-support'
    },
    {
        id: 17,
        title: 'Profile',
        icon: <FiUsers />,
        role: 'seller',
        path: '/seller/dashboard/profile'
    },
]