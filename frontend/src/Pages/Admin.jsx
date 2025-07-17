import ProjectListing from "../components/ProjectListing/ProjectListing";
import MessageList from "../components/MessageList/MessageList";
import "./Admin.css";

function Admin() {
	return (
		<div id="admin-page">
			<h1>Admin</h1>
			<hr />
			<MessageList />
			<hr />
			<ProjectListing canEdit={true}></ProjectListing>
		</div>
	);
}

export default Admin;
