import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import API_URL from "../api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", assignedTo: "", projectId: "", dueDate: "" });
    const [loading, setLoading] = useState(false);
    const role = localStorage.getItem("role");

    useEffect(() => { fetchTasks(); fetchUsers(); fetchProjects(); }, []);

    const getAuthHeader = () => ({ authorization: `Bearer ${localStorage.getItem("token")}` });

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/tasks`, { headers: getAuthHeader() });
            setTasks(res.data);
        } catch (error) { console.error(error); }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/auth/users`, { headers: getAuthHeader() });
            setUsers(res.data);
        } catch (error) { console.error(error); }
    };

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/projects`, { headers: getAuthHeader() });
            setProjects(res.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/tasks`, formData, { headers: getAuthHeader() });
            setFormData({ title: "", description: "", assignedTo: "", projectId: "", dueDate: "" });
            fetchTasks();
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${API_URL}/api/tasks/${id}`, { status }, { headers: getAuthHeader() });
            fetchTasks();
        } catch (error) { console.error(error); }
    };

    const statusClass = (status) => {
        if (status === "Completed") return "badge-completed";
        if (status === "In Progress") return "badge-progress";
        return "badge-pending";
    };

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="page-header">
                    <div>
                        <h1>Tasks</h1>
                        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                            {tasks.length} task{tasks.length !== 1 ? "s" : ""} across all projects
                        </p>
                    </div>
                </div>

                {role === "Admin" && (
                    <div className="card" style={{ marginBottom: "2rem" }}>
                        <h3 style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>New Task</h3>
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <div className="form-grid grid-2">
                                <div className="form-group">
                                    <label>Task title</label>
                                    <input type="text" name="title" placeholder="e.g. Design homepage" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" name="description" placeholder="Brief description" value={formData.description} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Assign to</label>
                                    <select name="assignedTo" onChange={handleChange} value={formData.assignedTo}>
                                        <option value="">Select member...</option>
                                        {users.map(user => (
                                            <option key={user._id} value={user._id}>{user.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Project</label>
                                    <select name="projectId" onChange={handleChange} value={formData.projectId}>
                                        <option value="">Select project...</option>
                                        {projects.map(project => (
                                            <option key={project._id} value={project._id}>{project.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Due date</label>
                                    <input type="date" name="dueDate" onChange={handleChange} value={formData.dueDate} />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary" style={{ width: "auto", alignSelf: "flex-start", padding: "0.65rem 1.5rem" }} disabled={loading}>
                                {loading ? "Creating..." : "Create Task →"}
                            </button>
                        </form>
                    </div>
                )}

                {tasks.length === 0 ? (
                    <div className="empty-state card">
                        <p style={{ fontSize: "1.5rem" }}>✅</p>
                        <p>No tasks yet. {role === "Admin" ? "Create your first one above." : "Ask an admin to assign you a task."}</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {tasks.map(task => (
                            <div className="card" key={task._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                                <div style={{ flex: 1, minWidth: "200px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                                        <h3>{task.title}</h3>
                                        <span className={`badge ${statusClass(task.status)}`}>{task.status}</span>
                                    </div>
                                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{task.description}</p>
                                    <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.5rem" }}>
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                            👤 {task.assignedTo ? task.assignedTo.name : "Unassigned"}
                                        </span>
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                            📁 {task.projectId ? task.projectId.title : "No project"}
                                        </span>
                                        {task.dueDate && (
                                            <span style={{ fontSize: "0.8rem", color: new Date(task.dueDate) < new Date() && task.status !== "Completed" ? "var(--danger)" : "var(--text-muted)" }}>
                                                📅 {new Date(task.dueDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <select
                                    value={task.status}
                                    onChange={(e) => updateStatus(task._id, e.target.value)}
                                    style={{ width: "auto", minWidth: "140px" }}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Tasks;