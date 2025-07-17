// import Layout from "../components/Layout/Layout";
import EmergeView from "../components/EmergeView";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import ProjectListing from "../components/ProjectListing/ProjectListing";
import Contact from "../components/Contact/Contact";

function Main() {
	return (
		<>
			<EmergeView>
				<Home />
			</EmergeView>
			<hr />
			<EmergeView>
				<About />
			</EmergeView>
			<hr />
			<EmergeView>
				<ProjectListing />
			</EmergeView>
			<hr />
			<EmergeView>
				<Contact />
			</EmergeView>
		</>
	);
}

export default Main;
