import "./Message.css";

function Message({ name, email, contents }) {
	return (
		<div className="message-item">
			<h3>{name}</h3>
			<p>
				<span>Email: </span>
				{email}
			</p>
			<p>
				<span>Message: </span>
				{contents}
			</p>
		</div>
	);
}

export default Message;
