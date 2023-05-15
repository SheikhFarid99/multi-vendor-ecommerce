import { lazy } from 'react'
const Home = lazy(() => import("../../views/Home"))
const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"))
const AddProduct = lazy(() => import("../../views/seller/AddProduct"))
export const sellerRoutes = [
    {
        path: '/',
        element: <Home />,
        ability: ['admin', 'seller']
    },
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        ability: ['seller']
    },
    {
        path: '/seller/dashboard/add-product',
        element: <AddProduct />,
        ability: ['seller']
    }
]