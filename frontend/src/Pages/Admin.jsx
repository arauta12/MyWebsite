import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../adminComponents/AdminHeader";
import AdminProjectListing from "../adminComponents/AdminProjectListing/AdminProjectListing";
import MessageList from "../adminComponents/MessageList/MessageList";
import axios from "axios";
import "./Admin.css";

function Admin() {
	axios.defaults.withCredentials = true;
	const [errorMessage, setErrorMessage] = useState("");
	const [userObj, setUserObj] = useState({ username: "", role: "" });

	const navigate = useNavigate();

	useEffect(() => {
		const autoLogin = async () => {
			try {
				const resp = await axios.post(
					"http://localhost:3000/api/auth/login",
					{}
				);
				if (resp.data?.status === "success") {
					const { username, role } = resp.data.data;
					setUserObj({ username, role });
				}
			} catch (err) {
				console.error(err);

				if (err.response?.status <= 403 && err.response.status >= 400)
					navigate("/admin");
			}
		};

		autoLogin();
	}, []);

	const handleLogout = async () => {
		try {
			const resp = await axios.post(
				"http://localhost:3000/api/auth/logout",
				{}
			);

			if (resp.data.status === "success") {
				navigate("/#");
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
		<AdminHeader role={userObj.role}>
			<MessageList />
			<hr />
			<AdminProjectListing role={userObj.role} />
			<section id="logout">
				<button onClick={handleLogout} className="logout-button">
					Logout
				</button>
				<p style={{ color: "var(--complement-color)" }}>
					{errorMessage}
				</p>
			</section>
		</AdminHeader>
	);
}

export default Admin;
