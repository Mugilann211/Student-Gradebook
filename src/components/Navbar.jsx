import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Gradebook System</div>
        <div className="space-x-4">
          <Link to="/students" className="hover:underline">Students</Link>
          <Link to="/subjects" className="hover:underline">Subjects</Link>
          <Link to="/grades" className="hover:underline">Grades</Link>
          <Link to="/report" className="hover:underline">Report</Link>
          <button onClick={handleLogout} className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
