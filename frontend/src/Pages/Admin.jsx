import AdminHeader from "../adminComponents/AdminHeader";
import AdminProjectListing from "../adminComponents/AdminProjectListing/AdminProjectListing";
import MessageList from "../adminComponents/MessageList/MessageList";
import "./Admin.css";

function Admin() {
	return (
		<AdminHeader>
			<MessageList />
			<hr />
			<AdminProjectListing />
		</AdminHeader>
	);
}

export default Admin;
