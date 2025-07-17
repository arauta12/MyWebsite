import "./Project.css";

function Project({
	name,
	imgName,
	description,
	details,
	link,
	canEdit,
	deleteProject,
}) {
	return (
		<section className="project">
			<h3>
				{name}
				{canEdit && (
					<button
						className="del-project-button edit-button project-button"
						onClick={deleteProject}
					>
						-
					</button>
				)}
			</h3>

			<div className="projectInfo">
				<img
					src={`/images/projectImages/${imgName}`}
					alt={name}
					height={300}
				/>
				<p>{description}</p>
			</div>

			{details && (
				<p>
					<br />
					{details}
				</p>
			)}
			{link && (
				<a href={link} target="_blank">
					See more
				</a>
			)}
		</section>
	);
}

export default Project;
