import { useNavigate, Link, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    const navLink = (to, label) => (
        <Link to={to} style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            fontSize: "0.9rem",
            fontWeight: "500",
            color: location.pathname === to ? "var(--teal-light)" : "var(--text-secondary)",
            background: location.pathname === to ? "var(--teal-glow)" : "transparent",
            border: location.pathname === to ? "1px solid var(--border)" : "1px solid transparent",
            transition: "all 0.2s"
        }}>
            {label}
        </Link>
    );

    return (
        <nav style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(10, 15, 15, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            padding: "0 1.5rem",
        }}>
            <div style={{
                maxWidth: "1100px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "60px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <span style={{ fontSize: "1.2rem", marginRight: "0.75rem" }}>⚡</span>
                    {navLink("/dashboard", "Dashboard")}
                    {navLink("/projects", "Projects")}
                    {navLink("/tasks", "Tasks")}
                </div>
                <button className="btn-danger" onClick={handleLogout} style={{ fontSize: "0.85rem", padding: "0.4rem 1rem" }}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;