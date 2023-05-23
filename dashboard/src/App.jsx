import { useEffect, useState } from "react";
import Router from './router/Router'
import publicRoutes from './router/routes/publicRoutes'
import { getRoutes } from "./router/routes";
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from "./store/Reducers/authReducer";
function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  useEffect(() => {
    const routes = getRoutes()
    setAllRoutes([...allRoutes, routes])
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo())
    }
  }, [token])
  return <Router allRoutes={allRoutes} />
}

export default App;
