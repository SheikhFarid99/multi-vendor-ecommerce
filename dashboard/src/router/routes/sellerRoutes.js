import { lazy } from 'react'
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"))
const AddProduct = lazy(() => import("../../views/seller/AddProduct"))
const Products = lazy(() => import("../../views/seller/Products"))
const DiscountProducts = lazy(() => import("../../views/seller/DiscountProducts"))
const Orders = lazy(() => import("../../views/seller/Orders"))
const Payments = lazy(() => import("../../views/seller/Payments"))
const SellerToAdmin = lazy(() => import("../../views/seller/SellerToAdmin"))
const SellerToCustomer = lazy(() => import("../../views/seller/SellerToCustomer"))
const Profile = lazy(() => import("../../views/seller/Profile"))
const EditProduct = lazy(() => import("../../views/seller/EditProduct"))
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"))
export const sellerRoutes = [
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/add-product',
        element: <AddProduct />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/edit-product/:productId',
        element: <EditProduct />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/products',
        element: <Products />,
        role: 'seller',
        status: 'active'
    },

    {
        path: '/seller/dashboard/discount-products',
        element: <DiscountProducts />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/orders',
        element: <Orders />,
        role: 'seller',
        ability: ['active', 'deactive']
    },
    {
        path: '/seller/dashboard/order/details/:orderId',
        element: <OrderDetails />,
        role: 'seller',
        ability: ['active', 'deactive']
    },
    {
        path: '/seller/dashboard/payments',
        element: <Payments />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-support',
        element: <SellerToAdmin />,
        ability: ['active', 'deactive', 'pending']
    },
    {
        path: '/seller/dashboard/chat-customer/:customerId',
        element: <SellerToCustomer />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-customer',
        element: <SellerToCustomer />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/profile',
        element: <Profile />,
        role: 'seller',
        status: 'active'
    }
]