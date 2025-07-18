import { useEffect, useState } from "react";

function useFetch(asyncCallback) {
	const [isLoading, setIsLoading] = useState(false);
	// const [loadingEllipsis, setLoadingEllipsis] = useState("");

	// useEffect(() => {
	// 	const loadingInterval = setInterval(() => {
	// 		const newLength = (loadingEllipsis.length + 1) % 4;
	// 		const newEllipses = (loadingEllipsis + ".").substring(0, newLength);
	// 		setLoadingEllipsis(newEllipses);
	// 	}, 500);

	// 	return () => {
	// 		clearInterval(loadingInterval);
	// 	};
	// }, [isLoading]);

	useEffect(() => {
		asyncCallback();
	}, []);

	return [
		isLoading,
		setIsLoading,
		<div>
			<p>Loading...</p>
		</div>,
	];
}

export default useFetch;
