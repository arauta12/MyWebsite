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
			<EmergeView>
				<About />
			</EmergeView>
			<EmergeView>
				<ProjectListing />
			</EmergeView>
			<EmergeView>
				<Contact />
			</EmergeView>
		</>
	);
}

export default Main;
