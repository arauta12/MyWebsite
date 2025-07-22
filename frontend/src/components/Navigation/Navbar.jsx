import "./Navbar.css";

// TODO: fix position of LinkendIn icon to end
function Navbar() {
	return (
		<nav>
			<p className="nav-item">
				<a href="/#">Home</a>
			</p>
			<p className="nav-item">
				<a href="/#aboutMe">About</a>
			</p>
			<p className="nav-item">
				<a href="/#projects">Projects</a>
			</p>
			<p className="nav-item">
				<a href="/#contact">Contact</a>
			</p>
		</nav>
	);
}

export default Navbar;
