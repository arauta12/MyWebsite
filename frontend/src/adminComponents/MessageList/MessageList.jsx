import { useState, useEffect } from "react";
import Message from "./Message";
import Loading from "../../components/Loading";
import axios from "axios";
import "./MessageList.css";

function MessageList() {
	axios.defaults.withCredentials = true; // Ensure cookies are sent with requests
	const [isLoading, setIsLoading] = useState(false);
	const [messageList, setMessageList] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				setIsLoading(true);
				const res = await axios.get(
					`${import.meta.env.VITE_API_URI}//api/messages`,
					{ timeout: 5000 }
				);
				setMessageList(res.data.data);
			} catch (err) {
				console.error(`ERROR: ${err.message}`);
				setErrorMessage(
					err.response?.data?.message || "Could not get messages."
				);
			} finally {
				setIsLoading(false);
			}
		};

		handleGetMessages();
	}, []);

	return (
		<div id="message-section">
			<h2>Messages</h2>
			<div className="message-container">
				{isLoading && (
					<div
						style={{
							border: "1px solid var(--text-color)",
							backgroundColor: "rgba(1, 24, 12, 0.85)",
							padding: "1rem",
							fontSize: "2rem",
							marginInline: "auto",
							borderRadius: "20px",
							color: "var(--text-color)",
							width: "100%",
							textAlign: "center",
						}}
					>
						<Loading />
					</div>
				)}
				{errorMessage && (
					<p
						style={{
							border: "1px solid var(--text-color)",
							backgroundColor: "rgba(1, 24, 12, 0.85)",
							padding: "3rem",
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
