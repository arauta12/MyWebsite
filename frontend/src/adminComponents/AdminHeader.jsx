function AdminHeader({ role, children }) {
	return (
		<div id="admin-page">
			<h1>{role || "Admin"}</h1>
			<hr />
			{children}
		</div>
	);
}

export default AdminHeader;
