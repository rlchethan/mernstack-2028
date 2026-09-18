import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        navigate("/login");
    };

    return (
        <nav>
            <h2>Student Task Management Portal</h2>

            <Link to="/dashboard">Dashboard</Link>{" "}
            <Link to="/tasks">Tasks</Link>{" "}

            <button onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;