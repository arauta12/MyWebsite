import { useState, useEffect } from "react";

function Loading() {
	const [trailingDots, setTrailingDots] = useState("");

	useEffect(() => {
		const dotsInterval = setInterval(() => {
			const newLength = (trailingDots.length + 1) % 4;
			const newDots = (trailingDots + ".").substring(0, newLength);
			setTrailingDots(newDots);
		}, 500);

		return () => {
			clearInterval(dotsInterval);
		};
	}, [trailingDots]);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignContent: "center",
				paddingTop: "2rem",
				paddingBottom: "2rem",
			}}
		>
			<p style={{ fontSize: "2rem" }}>{`Loading${trailingDots}`}</p>
		</div>
	);
}

export default Loading;
