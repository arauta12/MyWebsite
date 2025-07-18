import { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
	const [messageObj, setMessageObj] = useState({});
	const [submitMessageObj, setSubmitMessageObj] = useState({});

	const handleShowError = (message) => {
		setSubmitMessageObj({
			color: "crimson",
			message,
		});
		setTimeout(() => {
			setSubmitMessageObj({});
		}, 3000);
	};

	const handleShowSuccess = (message) => {
		setSubmitMessageObj({
			color: "limeGreen",
			message,
		});
		setTimeout(() => {
			setSubmitMessageObj({});
		}, 3000);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { name, email, contents } = messageObj;
		if (!name || !email || !contents) {
			handleShowError("Missing required fields!");
			return;
		}

		try {
			await axios.post("http://localhost:3000/api/messages", {
				data: messageObj,
			});
			handleShowSuccess("Sent!");
			setMessageObj({});
		} catch (err) {
			handleShowError("Submit error! Try again.");
		}
	};

	const handleChangeMessage = (e) => {
		if (e.target.name == "name") {
			const value = e.target.value;
			setMessageObj({ ...messageObj, name: value });
		} else if (e.target.name == "email") {
			const value = e.target.value;
			setMessageObj({ ...messageObj, email: value });
		} else if (e.target.name == "contents") {
			const value = e.target.value;
			setMessageObj({ ...messageObj, contents: value });
		}
	};

	console.log(messageObj);

	return (
		<section id="contact">
			<h2>Contact</h2>
			<div className="contact-section">
				<form className="section-item">
					<div>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Name"
							required
							autoComplete="name"
							value={messageObj.name}
							onChange={handleChangeMessage}
						/>
					</div>

					<div>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							autoComplete="email"
							value={messageObj.email}
							onChange={handleChangeMessage}
							required
						/>
					</div>

					<div>
						<textarea
							name="contents"
							id="message"
							placeholder="Enter your message"
							rows={5}
							cols={30}
							maxLength={1000}
							value={messageObj.message}
							onChange={handleChangeMessage}
							required
						></textarea>
					</div>
					<div style={{ display: "flex", flexFlow: "row nowrap" }}>
						<button type="submit" onClick={handleSubmit}>
							Send message
						</button>
						<div
							style={{
								alignSelf: "center",
								marginLeft: "1rem",
								color: submitMessageObj.color,
								fontSize: "1rem",
							}}
						>
							<p>{submitMessageObj.message}</p>
						</div>
					</div>
				</form>
				<div className="contact-info section-item">
					<div className="contact-item">
						<img src="/images/gmail1.png" />
						<p>andreirauta234@gmail.com</p>
					</div>
					<div className="contact-item">
						<img src="/images/linkedin-logo.png" />
						<p>
							<a
								className="contact-link"
								href="https://www.linkedin.com/in/andrei-rauta/"
								target="_blank"
							>
								https://www.linkedin.com/in/andrei-rauta/
							</a>
						</p>
					</div>
					<div className="contact-item">
						<img src="/images/github1.png" />
						<p>
							<a
								className="contact-link"
								href="https://github.com/arauta12/"
								target="_blank"
							>
								https://github.com/arauta12/
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Contact;
