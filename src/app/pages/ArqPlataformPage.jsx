
import React from 'react';
import { ArqPlataformLayout } from '../layout/';
import { PaginaEjemplo } from '../views';
import ModalTests from '../views/Modal';
import Modal from '../views/Modal';
import PlantillasMaestra from '../views/PlantillasMaestra';

export const ArqPlataformPage = () => {
    return (
        <ArqPlataformLayout>
            <PlantillasMaestra />
        </ArqPlataformLayout>
    );
}

