import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import ModalTest from "../../views/Modal";

export const Home = () => {
	const plantillas = useSelector(state => state.project.typeProjects);

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    height: "500px",
                    justifyContent: "space-around",
                    alignItems: "center",
                    alignContent: "center",
                    textDecoration: "none",
                    "& > :not(style)": {
                        m: 1,
                        textDecoration: "none",
                    }
                }}
            >
                {(plantillas || ["a", "b", "c"]).map((plantilla, idx) => (
                    <Link
						key={idx}
                        component={RouterLink}
                        color="inherit"
                        to={`/proyecto/${plantilla.slug}`}
                        sx={{ mt: 2 }}
                    >
						{
							plantillas
							? (
								<Paper
									sx={{
										cursor: "pointer",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										fontSize: "2rem",
										width: 350,
										height: 200,
										borderRadius: "20px",
										textAlign: "center",
									}}
									elevation={5}
								>
									<span>{plantilla.name.toUpperCase()}</span>
								</Paper>
							)
							: <Skeleton variant="rectangular" width={350} height={200} sx={{ borderRadius: "20px" }} />
						}
                        
                    </Link>
                ))}
            </Box>
        </div>
    )
}
