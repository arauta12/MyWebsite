import { useState, useEffect } from "react";
import Message from "./Message";
import axios from "axios";
import "./MessageList.css";

function MessageList() {
	const [messageList, setMessageList] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				const res = await axios.get(
					"http://localhost:3000/api/messages",
					{ timeout: 5000 }
				);
				setMessageList(res.data);
			} catch (error) {
				setErrorMessage(`Could not get messages: ${error.message}`);
			}
		};

		handleGetMessages();
	}, []);

	console.log(messageList);

	return (
		<div id="message-section">
			<h2>Messages</h2>
			<div className="message-container">
				{errorMessage && (
					<p
						style={{
							border: "1px solid var(--text-color)",
							backgroundColor: "rgba(1, 24, 12, 0.85)",
							padding: "4rem",
							fontSize: "2rem",
							marginInline: "auto",
							borderRadius: "20px",
							color: "var(--complement-color)",
							width: "100%",
							textAlign: "center",
						}}
					>
						{errorMessage}
					</p>
				)}
				{messageList &&
					messageList.map((message, i) => (
						<Message {...message} key={i} />
					))}
			</div>
		</div>
	);
}

export default MessageList;
