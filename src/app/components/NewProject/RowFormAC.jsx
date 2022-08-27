import { Button, Grid, IconButton } from '@mui/material';
import React from 'react'
import { styleInput } from './NewProjectForm';
import DeleteIcon from '@mui/icons-material/Delete';

export function RowFormAC({ onChange, onRemove, ambienteComplementario, capacidad }) {
    return (
        <Grid container spacing={1} sx={{ marginBottom: ".5rem" }}>
            <Grid item xs={6}>
                <input
                    value={ambienteComplementario}
                    disabled
                    style={{ ...styleInput, textAlign: "center" }}
                // onChange={e => onChange("ambienteComplementario", e.target.value)}

                />
            </Grid>
            <Grid item xs={3}>

                <input
                    // placeholder="Email"
                    style={{ ...styleInput, textAlign: "center" }}
                    // disabled
                    value={capacidad}
                    onChange={e => onChange("capacidad", e.target.value)}

                />
            </Grid>




            <IconButton onClick={() => onRemove()} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Grid>
    );
}