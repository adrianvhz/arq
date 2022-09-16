import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { arqPlataformAxios } from '../../utils/arqPlataformAxios'
import ModulePage from '../components/ModulePage/ModulePage'
import { ArqPlataformLayout } from '../layout'
import PlantillasMaestra from '../views/PlantillasMaestra'

export const ModuloEducacion = () => {


    return (
        <ArqPlataformLayout>
            <ModulePage pagina="educacion"></ModulePage>
        </ArqPlataformLayout>
    )
}

