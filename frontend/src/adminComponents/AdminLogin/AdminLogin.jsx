import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import Loading from "../../components/Loading";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
	axios.defaults.withCredentials = true;

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const autoLogin = async () => {
			try {
				const resp = await axios.post(
					`${import.meta.env.VITE_API_URI}/api/auth/login`,
					{}
				);
				if (resp.data?.status === "success") {
					console.log("Successful auto-login!");
					navigate("/admin/home");
				}
			} catch (err) {
				console.error(err.message);
			}
		};

		autoLogin();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_API_URI}/api/auth/login`,
				{
					data: { username, password },
				}
			);

			const status = res.data;
			if (status === "failed") {
				setErrorMessage(
					res.data.message || "Unable to login! Try again."
				);
			} else {
				console.log("success!");
				navigate("/admin/home");
			}
		} catch (err) {
			console.error(err.message);

			setErrorMessage(
				err.response?.data?.message || "Login error! Try again."
			);

			setTimeout(() => {
				setErrorMessage("");
			}, 3000);
		}
	};

	return (
		<AdminHeader>
			<section id="login-section">
				<form className="login-container" onSubmit={handleLogin}>
					<p>
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							id="username"
							maxLength={200}
							autoFocus
							placeholder="Enter username..."
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</p>
					<p>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Enter password..."
							maxLength={200}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</p>

					<button>Login</button>
				</form>
				{
					<p
						style={{
							color: "var(--complement-color)",
							textAlign: "center",
							margin: "1rem 0",
							fontSize: "1.25rem",
						}}
					>
						{errorMessage}
					</p>
				}
			</section>
		</AdminHeader>
	);
}

export default AdminLogin;
