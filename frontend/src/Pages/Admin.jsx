import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../adminComponents/AdminHeader";
import AdminProjectListing from "../adminComponents/AdminProjectListing/AdminProjectListing";
import MessageList from "../adminComponents/MessageList/MessageList";
import axios from "axios";
import "./Admin.css";

function Admin() {
	axios.defaults.withCredentials = true;
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const resp = await axios.post(
				"http://localhost:3000/api/auth/logout",
				{}
			);

			if (resp.data.status === "success") {
				navigate("/");
			}
		} catch (err) {
			console.log();

			setErrorMessage(
				err.response?.data?.message || "Failed to logout! Try again."
			);
			setTimeout(() => {
				setErrorMessage("");
			}, 3000);
		}
	};

	return (
		<AdminHeader>
			<MessageList />
			<hr />
			<AdminProjectListing />
			<hr />
			<section id="logout">
				<button onClick={handleLogout}>Logout</button>
				<p style={{ color: "var(--complement-color)" }}>
					{errorMessage}
				</p>
			</section>
		</AdminHeader>
	);
}

export default Admin;
