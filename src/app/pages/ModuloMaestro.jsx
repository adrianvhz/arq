import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { request } from '../../utils/arqPlataformAxios'
import ModulePage from '../components/ModulePage/ModulePage'
import { ArqPlataformLayout } from '../layout'
import PlantillasMaestra from '../views/PlantillasMaestra'

export const ModuloMaestro = () => {
    const location = useLocation();
    const slug = location.pathname.split('/')[2];
    const [tipoProjecto, setTipoProjecto] = useState(null);

    const getTypeProject = async () => {
        const data = await request({ url: `typeProject/${slug}`, method: 'GET' });
        setTipoProjecto(data.data[0])
    }
    useEffect(() => {
        getTypeProject();
    }, []);

    if (!tipoProjecto) { return <div>Cargando...</div> }

    return (
        <ArqPlataformLayout>
            <ModulePage proyecto={tipoProjecto} ></ModulePage>
        </ArqPlataformLayout>
    )
}

