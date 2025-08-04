// import { useEffect, useState } from "react";
// import axios from "axios";
import "./Project.css";

function Project({ name, image, description, link }) {
	// const [url, setUrl] = useState("/images/noimage.jpg");

	// useEffect(() => {
	// 	const createUrl = async () => {
	// 		const name = `${image[0]}-${image[1]}`;
	// 		try {
	// 			const resp = await axios.get(
	// 				`http://localhost:3000/api/uploads/images/${name}`,
	// 				{ timeout: 5000 }
	// 			);

	// 			setUrl(resp.data.data);
	// 		} catch (err) {
	// 			console.error(err.message);
	// 		}
	// 	};

	// 	createUrl();
	// }, []);

	// console.log(`Image url: ${url}`);

	return (
		<section className="project">
			<h3>{name}</h3>

			<div className="projectInfo">
				<img
					src={`/images/projectImages/${image[1]}`}
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
