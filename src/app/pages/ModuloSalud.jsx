import React from 'react'
import ModulePage from '../components/ModulePage/ModulePage'
import { ArqPlataformLayout } from '../layout'
import PlantillasMaestra from '../views/PlantillasMaestra'

const ModuloSalud = () => {
    return (
        <ArqPlataformLayout>
            <ModulePage pagina="salud"></ModulePage>
        </ArqPlataformLayout>
    )
}

export default ModuloSalud