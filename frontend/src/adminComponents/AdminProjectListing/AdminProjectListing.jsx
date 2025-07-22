import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import CreateProject from "../CreateProject";
import Project from "../../components/ProjectListing/Project";
import "../../components/ProjectListing/ProjectListing";

function AdminProjectListing() {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [projects, setProjects] = useState([]);
	const [projectIndex, setProjectIndex] = useState(0);
	const [newProjectObj, setNewProjectObj] = useState({});

	useEffect(() => {
		const handleGetProjects = async () => {
			try {
				const result = await axios.get(
					"http://localhost:3000/api/projects",
					{
						filter: { show: true },
						timeout: 5000,
					}
				);

				setProjects(result.data);
				setIsLoading(false);
			} catch (err) {
				console.error(`ERROR: ${err.message}`);
				setErrorMessage("Could not get project info.");
			} finally {
				setIsLoading(false);
			}
		};

		handleGetProjects();
	}, []);

	const handleChangeIndex = (newIndex) => {
		setProjectIndex(newIndex);
	};

	const saveProject = async () => {
		try {
			// const res = await axios.post
		} catch (err) {
			console.error(`Save project error: ${err.message}`);
		}
	};

	const deleteProject = () => {
		console.log("Remove project!");
	};

	const selectedProject = projects.length ? projects[projectIndex] : {};

	return (
		<section id="projects">
			<h2>Projects</h2>
			<div className="project-view">
				{isLoading ? (
					<Loading />
				) : errorMessage ? (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
							paddingTop: "2rem",
							paddingBottom: "2rem",
						}}
					>
						<p
							style={{
								fontSize: "2rem",
								color: "var(--complement-color)",
								textAlign: "center",
							}}
						>
							{errorMessage}
						</p>
					</div>
				) : (
					<>
						<div className="buttons-container">
							<button
								className="edit-button add-project-button project-button"
								onClick={saveProject}
							>
								+
							</button>

							{projects.map((project, i) => (
								<button
									onClick={() => handleChangeIndex(i)}
									className="project-button show-button"
									key={i}
								>
									{project.name}
								</button>
							))}
						</div>
						<Project
							{...selectedProject}
							canEdit={true}
							deleteProject={deleteProject}
						/>
					</>
				)}
			</div>
		</section>
	);
}

export default AdminProjectListing;
