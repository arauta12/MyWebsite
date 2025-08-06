import "./ImageLink.css";

function ImageLink({ imageName, url, name, customStyles }) {
	return (
		<a className="web-container" href={url} target="_blank">
			<img src={`/images/${imageName}`} alt={name} style={customStyles} />
		</a>
	);
}

export default ImageLink;
