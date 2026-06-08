function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("User");
  if(!token || user) {
    toast.error("Please log in first.");
    return <Navigate to="/login" replace/>;
  } else {
    return <Outlet/>;
  }
}

export default ProtectedRoute;