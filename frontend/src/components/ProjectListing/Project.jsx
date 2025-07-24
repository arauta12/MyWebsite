import "./Project.css";

function Project({ name, image, description, link }) {
	return (
		<section className="project">
			<h3>{name}</h3>

			<div className="projectInfo">
				<img
					src={`/images/projectImages/${image}`}
					alt={name}
					height={300}
					loading="lazy"
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
