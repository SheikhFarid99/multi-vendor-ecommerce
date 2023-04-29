import { useRoutes } from 'react-router-dom'
const Router = ({ allRoutes }) => {
    const routes = useRoutes([...allRoutes])
    return routes ;
}

export default Router