import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./Pages/Main";
import Admin from "./Pages/Admin";
import Error from "./Pages/Error";
import AdminLogin from "./adminComponents/AdminLogin/AdminLogin";
import "./App.css";

function App() {
	const scrollYPos = useRef(window.scrollY);
	const header = useRef(null);

	const headerShowOnScroll = () => {
		if (scrollYPos.current > window.scrollY || scrollYPos.current === 0) {
			header.current.style.transition = "transform 0.5s linear";
			header.current.style.transform = "translateY(0px)";
		} else if (scrollYPos.current < window.scrollY) {
			header.current.style.transition = "transform 0.5s linear";
			header.current.style.transform =
				"translateY(calc(-1 * (2rem + 100px)))";
		}

		scrollYPos.current = window.scrollY;
	};

	useEffect(() => {
		window.addEventListener("scroll", headerShowOnScroll);
		return () => {
			window.removeEventListener("scroll", headerShowOnScroll);
		};
	}, []);

	return (
		<Layout ref={header}>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="admin">
					<Route index element={<AdminLogin />} />
					<Route path="login" element={<AdminLogin />} />
					<Route path="home" element={<Admin />} />
				</Route>
				<Route path="*" element={<Error />} />
			</Routes>
		</Layout>
	);
}

export default App;
