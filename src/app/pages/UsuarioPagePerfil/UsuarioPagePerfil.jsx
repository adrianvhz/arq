import { ArqPlataformLayout } from '../../layout'
import { PerfilView } from '../../views/PerfilView/PerfilView';
import { useDispatch } from 'react-redux';
import { getPlanUserById } from './../../../redux/planes';
import { useEffect } from 'react';


export const UsuarioPagePerfil = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlanUserById())
    }, []);

    return (
        
            <ArqPlataformLayout>               
                <PerfilView />
            </ArqPlataformLayout>
        
    );
}

