import Message from "./Message";
import "./MessageList.css";

function MessageList() {
	const messageList = [
		{
			name: "andrei",
			email: "none@you",
			message: "test",
			sentTime: "06-20-2025",
		},
	];

	return (
		<div id="message-section">
			<h2>Messages</h2>
			<Message {...messageList[0]} />
		</div>
	);
}

export default MessageList;
