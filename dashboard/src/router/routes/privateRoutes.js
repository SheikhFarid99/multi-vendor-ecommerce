import {adminRoutes} from './adminRoutes'
import {sellerRoutes} from './sellerRoutes'

export const privateRoutes = [
    ...adminRoutes,
    ...sellerRoutes
]