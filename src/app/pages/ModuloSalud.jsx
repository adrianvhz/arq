import React from 'react'
import ModulePage from '../components/ModulePage/ModulePage'
import { ArqPlataformLayout } from '../layout'
import PlantillasMaestra from '../views/PlantillasMaestra'

export const ModuloSalud = () => {
    return (
        <ArqPlataformLayout>
            <ModulePage pagina="salud"></ModulePage>
        </ArqPlataformLayout>
    )
}

