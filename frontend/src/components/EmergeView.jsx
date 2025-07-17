import { useRef, useEffect } from "react";

function EmergeView({ children }) {
	const emergeView = useRef(null);

	useEffect(() => {
		const interest = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					if (entry.isIntersecting) {
						const target = entry.target;
						const delay =
							entry.intersectionRatio >= 0.65 ? "1" : "0";
						target.style.animation = `emerge 1s ease-out ${delay}s 1 normal forwards`;
					}
				},
				{ rootMargin: "0px", threshold: 0.3 }
			);
		});

		if (emergeView.current) {
			interest.observe(emergeView.current);
		}

		return () => {
			if (emergeView.current) interest.unobserve(emergeView.current);
		};
	}, [emergeView]);

	return <div ref={emergeView}>{children}</div>;
}

export default EmergeView;
