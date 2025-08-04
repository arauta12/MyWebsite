import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";
import Project from "./Project";
import "./ProjectListing.css";

// NOTE: remove console.log statements

function ProjectListing() {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [projects, setProjects] = useState([]);
	const [projectIndex, setProjectIndex] = useState(0);
	// const [imageUrls, setImageUrls] = useState([]);

	useEffect(() => {
		const handleGetProjects = async () => {
			try {
				const result = await axios.get(
					"http://localhost:3000/api/projects/public",
					{
						timeout: 5000,
					}
				);

				setProjects(result.data.data);
				// return result.data.data;
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
						<Project {...selectedProject} />
					</>
				)}
			</div>
		</section>
	);
}

export default ProjectListing;
