
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isCheckToken } from '../providers/authProvider';
import { login, logout } from '../redux/auth';


export const useAuthStore = () => {
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

     const useCheckAuth = async () => {
  
            const token = localStorage.getItem('token')
            if(!token) return dispatch(logout());
           try {
            const  { data }  =  await isCheckToken(token)
            const  user = data.data
            dispatch(login({uid:user.id,name:user.name,lastname:user.lastname, email:user.email}));
           } catch (error) {
            console.log(error)
            dispatch(logout());
           }
    
 }

    return {status ,useCheckAuth}
}
