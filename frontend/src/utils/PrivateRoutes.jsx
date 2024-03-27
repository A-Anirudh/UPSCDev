import { Navigate,Outlet } from 'react-router-dom'
import {  useSelector } from 'react-redux'

export const PrivateRoutes = () => {
const{userInfo}=useSelector((state)=>state.auth)
return userInfo?.data?.pid? <Outlet/> :<Navigate to='/' replace />//make it landing page later
}