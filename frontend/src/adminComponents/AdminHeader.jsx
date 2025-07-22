function AdminHeader({ children }) {
	return (
		<div id="admin-page">
			<h1>Admin</h1>
			<hr />
			{children}
		</div>
	);
}

export default AdminHeader;
