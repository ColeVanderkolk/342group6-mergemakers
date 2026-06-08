function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if(!token) {
    toast.error("Please log in first.");
    return <Navigate to="/login" replace/>;
  } else {
    return <Outlet/>;
  }
}

export default ProtectedRoute;