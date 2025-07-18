import "./Project.css";

function Project({ name, image, description, link, canEdit, deleteProject }) {
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
					src={`/images/projectImages/${image}`}
					alt={name}
					height={300}
				/>
				<ul>
					{description &&
						description.map((content, i) => (
							<li key={i}>{content}</li>
						))}
				</ul>
			</div>
			{link && (
				<a href={link} target="_blank">
					See more
				</a>
			)}
		</section>
	);
}

export default Project;
