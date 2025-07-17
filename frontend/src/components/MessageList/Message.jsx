import "./Message.css";

function Message({ name, email, message, sentTime }) {
	const timeElapsed = Date.now() - sentTime;
	return (
		<div className="message-container">
			<h3>{name}</h3>
			<p>{message}</p>
			<p>{email}</p>
			<p>
				<time datetime={timeElapsed}>{timeElapsed}</time>
			</p>
		</div>
	);
}

export default Message;
