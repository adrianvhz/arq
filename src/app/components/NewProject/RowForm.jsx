import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React from 'react'
import { styleInput } from './NewProjectForm';
import DeleteIcon from '@mui/icons-material/Delete';

export function RowForm({ onChange, onRemove, vertice, lado, dist, angulo, retiros, disabled, disabledDeleted }) {
    return (
        <Grid container spacing={1} sx={{ marginBottom: ".5rem" }}>
            <Grid item xs={2}>
                <input
                    value={vertice}
                    disabled
                    style={{ ...styleInput, textAlign: "center" }}
                />
            </Grid>
            <Grid item xs={2}>

                <input
                    // placeholder="Email"
                    style={{ ...styleInput, textAlign: "center" }}
                    disabled
                    value={lado}
                    onChange={e => onChange("lado", e.target.value)}

                />
            </Grid>

            <Grid item xs={2}>

                <input
                    style={{ ...styleInput, textAlign: "center" }}
                    disabled={disabled}

                    value={dist}
                    onChange={e => onChange("dist", e.target.value)}
                />
            </Grid>

            <Grid item xs={3}>

                <input
                    style={{ ...styleInput, textAlign: "center" }}
                    disabled={disabled}

                    value={angulo}
                    onChange={e => onChange("angulo", e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>

                <input
                    style={{ ...styleInput, textAlign: "center" }}
                    disabled={disabled}

                    value={retiros}
                    onChange={e => onChange("retiros", e.target.value)}
                />
            </Grid>


            <IconButton disabled={!disabledDeleted} onClick={() => onRemove()} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Grid>
    );
}