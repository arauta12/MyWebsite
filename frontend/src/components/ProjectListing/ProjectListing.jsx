import { useState } from "react";
import Project from "./Project";
import "./ProjectListing.css";

function ProjectListing({ canEdit }) {
	const projects = [
		{
			name: "Clubfinity",
			imgName: "clubfinity.png",
			description:
				"A mobile app for university students to get all the latest information about their favorite clubs. Clubfinity gives students the opportunity to discover and experience new clubs, as well as a way to be continually notified of upcoming events!",
			details:
				"The app is developed on a MERN tech stack, with the frontend developed using React Native, the backend with NodeJS with the ExpressJS framework, and MongoDB NoSQL database. Frontend and backend are connected through a stateless JSON REST API. Code version control managed by Git and Gitlab, with a CI/CD pipeline for automated testing upon merging, improving code quality by 50%. Collaboration is done in teams of 3-4 with sprint meetings every 2 weeks to discuss app progress and new sprint backlog items.",
			link: "https://gitlab.com/ufsec/clubfinity",
		},
		{
			name: "Jonra",
			imgName: "jonra.png",
			description:
				"A website for developers and project managers to manage tasks and boards for projects. Students are also able to use Jonra to manage homework and other tasks for classes or daily life!",
			details:
				"The frontend is developed through React for user interaction. The backend is built off of the Django framework with a SQLite database managed with Django's ORM for CRUD operations. Frontend and backend communicate with a stateless JSON REST API along with user authentication. Code version control is handled by Git and Github. Collaboration was done with 2 others utilizing Agile methology with regular scrum meetings and sprint meetings every 3-4 weeks.",
			link: "https://github.com/JonKissil/Jonra",
		},
	];

	const [projectIndex, setProjectIndex] = useState(0);

	const handleChangeIndex = (newIndex) => {
		setProjectIndex(newIndex);
	};

	const saveProject = () => {
		console.log("Click for new project!");
	};

	const deleteProject = () => {
		console.log("Remove project!");
	};

	const selectedProject = projects[projectIndex];

	return (
		<section id="projects">
			<h2>Projects</h2>
			<div className="project-view">
				<div className="buttons-container">
					{canEdit && (
						<button
							className="edit-button add-project-button project-button"
							onClick={saveProject}
						>
							+
						</button>
					)}
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
					canEdit={canEdit}
					deleteProject={deleteProject}
				/>
			</div>
		</section>
	);
}

export default ProjectListing;
