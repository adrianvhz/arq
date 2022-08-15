
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/auth';


export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch();


    useEffect(() => {

      dispatch(logout());
      //funcion de firebase cuando el estado de la autenticacion cambia
          
    }, []);


    return {
        status
    }

  
}
