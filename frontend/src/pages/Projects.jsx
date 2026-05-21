import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import API_URL from "../api";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(false);
    const role = localStorage.getItem("role");

    useEffect(() => { fetchProjects(); }, []);

    const getAuthHeader = () => ({ authorization: `Bearer ${localStorage.getItem("token")}` });

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/projects`, { headers: getAuthHeader() });
            setProjects(res.data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/projects`, formData, { headers: getAuthHeader() });
            setFormData({ title: "", description: "" });
            fetchProjects();
        } catch (error) {
            console.error("Failed to create project:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="page-header">
                    <div>
                        <h1>Projects</h1>
                        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                            {projects.length} project{projects.length !== 1 ? "s" : ""} in your workspace
                        </p>
                    </div>
                </div>

                {role === "Admin" && (
                    <div className="card" style={{ marginBottom: "2rem" }}>
                        <h3 style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>New Project</h3>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div className="form-group">
                                <label>Project title</label>
                                <input type="text" name="title" placeholder="e.g. Marketing Website" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" name="description" placeholder="What is this project about?" value={formData.description} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: "auto", alignSelf: "flex-start", padding: "0.65rem 1.5rem" }} disabled={loading}>
                                {loading ? "Creating..." : "Create Project →"}
                            </button>
                        </form>
                    </div>
                )}

                {projects.length === 0 ? (
                    <div className="empty-state card">
                        <p style={{ fontSize: "1.5rem" }}>📁</p>
                        <p>No projects yet. {role === "Admin" ? "Create your first one above." : "Ask an admin to create one."}</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                        {projects.map(project => (
                            <div className="card" key={project._id}>
                                <div style={{
                                    width: "36px", height: "36px",
                                    background: "var(--teal-glow)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "1rem", marginBottom: "0.75rem"
                                }}>📁</div>
                                <h3 style={{ marginBottom: "0.4rem" }}>{project.title}</h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                                    {project.description || "No description"}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Projects;