import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import AdminEditProject from "../AdminEditProject/AdminEditProject";
import Project from "../../components/ProjectListing/Project";
import "./AdminProjectListing.css";
import axios from "axios";

function AdminProjectListing({ role }) {
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");
	const [projects, setProjects] = useState([]);
	const [projectIndex, setProjectIndex] = useState(0);

	const [edit, setEdit] = useState(false);

	useEffect(() => {
		const handleGetProjects = async () => {
			try {
				const result = await axios.get(
					`${import.meta.env.VITE_API_URI}/api/projects`,
					{
						timeout: 5000,
					}
				);

				setProjects(result.data.data);
				setIsLoading(false);
			} catch (err) {
				console.error(`ERROR: ${err.message}`);
				setErrorMessage(
					err.response?.data?.message || "Could not get projects."
				);
			} finally {
				setIsLoading(false);
			}
		};

		handleGetProjects();
	}, []);

	const handleChangeIndex = (newIndex) => {
		setProjectIndex(newIndex);
		setEdit(false);
	};

	const handleSaveImage = async (file) => {
		const reader = new FileReader();
		reader.onload = () => {
			console.log(reader.result);
		};
	};

	const saveProject = async (projectObj) => {
		try {
			const file = projectObj.file;
			const descriptionList =
				projectObj?.description?.split("\n\n") || [];
			delete projectObj.file;

			const newProject = {
				...projectObj,
				image: file?.name,
				description: descriptionList,
			};

			console.log(file);

			const resp = await axios.post(
				`${import.meta.env.VITE_API_URI}/api/projects`,
				{
					data: newProject,
					timeout: 5000,
				}
			);

			if (resp.data.status >= 400) {
				setErrorMessage("Could not create project!");

				setTimeout(() => {
					setErrorMessage("");
				}, 3000);
			} else {
				const { data } = resp.data;
				setProjects([{ ...newProject, _id: data.id }, ...projects]);
			}
		} catch (err) {
			console.error(`Save project error: ${err.message}`);
			setErrorMessage("Could not create project!");

			setTimeout(() => {
				setErrorMessage("");
			}, 3000);
		}
	};

	const deleteProject = async () => {
		if (edit) return;

		if (selectedProject.show == true) {
			alert(`Can't delete: ${selectedProject.name} is public!`);
			return;
		}

		const resp = confirm(`Delete "${selectedProject.name}"? (PERMANENT)`);

		if (resp) {
			try {
				const resp = await axios.delete(
					`${import.meta.env.VITE_API_URI}/api/projects/${
						selectedProject._id
					}`
				);

				const { status, data, message } = resp.data;

				if (status >= 400) {
					alert(`Error: ${message}`);
				} else {
					alert(`Deleted ${data.name}.`);
					setProjects(
						projects.filter(
							(project) => project._id !== selectedProject._id
						)
					);
					setProjectIndex(0);
				}
			} catch (err) {
				console.error(`Delete project error: ${err.message}`);

				alert(`Failed to delete ${selectedProject.name}`);
			}
		}
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
						<div className="buttons-container manager-container">
							{role === "Admin" && (
								<>
									<button
										className="edit-button delete-button"
										onClick={deleteProject}
									>
										<img
											src="/images/delete.png"
											alt=""
											width={15}
											height={15}
											style={{ marginRight: "10px" }}
										/>
										{selectedProject.name}
									</button>
									<button
										className="edit-button new-button"
										onClick={() => setEdit(true)}
									>
										New
									</button>
								</>
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

						{edit ? (
							<AdminEditProject
								projectObj={{ show: false }}
								saveProject={saveProject}
							/>
						) : (
							<Project {...selectedProject} />
						)}
					</>
				)}
			</div>
		</section>
	);
}

export default AdminProjectListing;
