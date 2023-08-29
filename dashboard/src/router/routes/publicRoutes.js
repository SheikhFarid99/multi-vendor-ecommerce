import { lazy } from 'react'
const Success = lazy(() => import('../../views/Success'))
const Login = lazy(() => import('../../views/auth/Login'))
const Register = lazy(() => import('../../views/auth/Register'))
const AdminLogin = lazy(() => import('../../views/auth/AdminLogin'))
const Home = lazy(() => import('../../views/Home'))
const UnAuthorized = lazy(() => import('../../views/UnAuthorized'))
const publicRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/admin/login',
        element: <AdminLogin />
    },
    {
        path: '/unauthorized',
        element: <UnAuthorized />
    },
    {
        path: '/success?',
        element: <Success />
    }


]
export default publicRoutes