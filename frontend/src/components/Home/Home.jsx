import ImageLink from "../ImageLink/ImageLink";
import "./Home.css";

function Home() {
	return (
		<section id="home">
			<h1>
				Hi, I am <span className="highlight">Andrei Rauta</span>!
			</h1>
			<p className="big-description">
				I'm a curious Computer Science student at UF and future Software
				Engineer!
			</p>
			<div className="link-container">
				<ImageLink
					imageName={"linkedin-logo.png"}
					url={"https://www.linkedin.com/in/andrei-rauta/"}
					name={"LinkedIn"}
				/>
				<ImageLink
					imageName={"github1.png"}
					url={"https://github.com/arauta12/"}
					name={"GitHub"}
				/>
				<a
					className="resume-container"
					href="/docs/resume.pdf"
					target="_blank"
				>
					<p>Resume</p>
					<img src="/images/download-icon.png" alt="" />
				</a>
			</div>
		</section>
	);
}

export default Home;
