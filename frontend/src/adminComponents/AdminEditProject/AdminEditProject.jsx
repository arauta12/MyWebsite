import { useState } from "react";
import "./AdminEditProject.css";

function AdminEditProject({ projectObj, saveProject }) {
	const [editInfo, setEditInfo] = useState(projectObj);
	const [imageFile, setImageFile] = useState(null);

	const createProject = (e) => {
		e.preventDefault();
		console.log("Pressed submit!");

		if (!editInfo?.name || !editInfo.description || !editInfo.link) {
			return;
		}

		saveProject({ ...editInfo, file: imageFile });
		setEditInfo({ show: false });
	};

	const handleShowToggle = (e) => {
		const show = e.target.value == "true" ? true : false;
		setEditInfo({ ...editInfo, show });
	};

	const handleFileChange = (e) => {
		const files = e.target.files;

		setEditInfo({ ...editInfo, image: e.target.value });
		setImageFile(files.length ? files[0] : null);

		const reader = new FileReader();
		reader.onload = () => {
			console.log(reader.result);
		};

		reader.readAsArrayBuffer(files[0]);
	};

	return (
		<section className="project edit-container">
			<h3>New Project</h3>
			<form>
				<div className="edit-item">
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						name="name"
						id="name"
						value={editInfo?.name || ""}
						onChange={(e) =>
							setEditInfo({ ...editInfo, name: e.target.value })
						}
						required
					/>
				</div>

				<div className="edit-item">
					<label htmlFor="image">Image: </label>
					<input
						type="file"
						name="image"
						id="image"
						accept="image/*"
						value={editInfo?.image || ""}
						onChange={handleFileChange}
					/>
				</div>

				<div className="edit-item">
					<label htmlFor="link">Link: </label>
					<input
						type="url"
						name="link"
						id=""
						value={editInfo?.link || ""}
						onChange={(e) =>
							setEditInfo({ ...editInfo, link: e.target.value })
						}
					/>
				</div>

				<div className="edit-item textarea">
					<label htmlFor="contents">
						Description (double new line for new bullet):{" "}
					</label>
					<textarea
						name="contents"
						id="contents"
						value={editInfo?.description || ""}
						onChange={(e) =>
							setEditInfo({
								...editInfo,
								description: e.target.value,
							})
						}
						required
					/>
				</div>

				<div className="edit-item radio">
					<label htmlFor="show">
						Show
						<input
							type="radio"
							name="show"
							id="show"
							value={true}
							checked={editInfo?.show || false}
							onChange={handleShowToggle}
						/>
					</label>

					<label htmlFor="show">
						Hide
						<input
							type="radio"
							name="show"
							id="hide"
							value={false}
							checked={!editInfo?.show}
							onChange={handleShowToggle}
						/>
					</label>
				</div>

				<button type="submit" onClick={createProject}>
					Create
				</button>
			</form>
		</section>
	);
}

export default AdminEditProject;
