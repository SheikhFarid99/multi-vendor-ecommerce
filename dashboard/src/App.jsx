import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Router from './router/Router'
import publicRoutes from './router/routes/publicRoutes'
import { getRoutes } from "./router/routes";
import { get_user_info } from "./store/Reducers/authReducer";
function App() {
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])
  useEffect(() => {
    const routes = getRoutes()
    setAllRoutes([...allRoutes, routes])
  }, [])
  useEffect(() => {
    if (token) {
      dispatch(get_user_info())
    }
  }, [token])
  return <Router allRoutes={allRoutes} />
}

export default App;
