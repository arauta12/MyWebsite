import { useState, useRef } from "react";
import AdminHeader from "../AdminHeader";
import Loading from "../../components/Loading";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			throw new Error("HI");
		} catch (error) {
			setErrorMessage("Login error! Try again.");

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
							type="text"
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
