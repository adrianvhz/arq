import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import VersionItem from "./VersionItem";
import SelectedVersion from "./SelectedVersion";

export function VersionsPage() {
    const params = useParams();
	const projects = useSelector(state => state.project.projects);
	const versions = projects.filter(el => el.parent_id === Number(params.id));

	const [selectedVersion, setSelectedVersion] = useState(null);

	console.log(123);

	const handleSelectedVersion = (newSelectedVersion) => {
		setSelectedVersion(newSelectedVersion);
	}

	useEffect(() => {
		projects.length > 0 && handleSelectedVersion(versions[0]);
	}, [projects]);

    return (
		<Grid container>
			{/* versions list */}
			<Grid item md={2}>
				<Grid container spacing={2}>
					{versions.map(version => (
						<VersionItem key={version.id} version={version} handleSelectedVersion={handleSelectedVersion} />
					))}
				</Grid>
			</Grid>

			{/* views (2D and 3D) selected version */}
			<Grid item md={10}>
				{
					selectedVersion
					? <SelectedVersion selectedVersion={selectedVersion} />
					: <span>Cargando...</span>
				}
			</Grid>
        </Grid>
    )
}
