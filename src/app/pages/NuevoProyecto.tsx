import React from 'react';
import NewProjectForm from '../components/NewProject/NewProjectForm';
import { ArqPlataformLayout } from '../layout';

const NuevoProyecto = ({ proyecto }) => {
  return (
    <ArqPlataformLayout>
      <NewProjectForm proyecto={proyecto} />
    </ArqPlataformLayout>
  );
};

export default NuevoProyecto;
