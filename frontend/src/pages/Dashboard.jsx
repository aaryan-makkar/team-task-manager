import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import API_URL from "../api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => { fetchTasks(); }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/tasks`, {
                headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setTasks(res.data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const inProgress = tasks.filter(t => t.status === "In Progress").length;
    const pending = tasks.filter(t => t.status === "Pending").length;
    const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Completed").length;

    const stats = [
        { label: "Total Tasks", value: total, color: "var(--teal-light)" },
        { label: "Completed", value: completed, color: "var(--completed)" },
        { label: "In Progress", value: inProgress, color: "var(--in-progress)" },
        { label: "Pending", value: pending, color: "var(--pending)" },
        { label: "Overdue", value: overdue, color: "var(--danger)" },
    ];

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="page-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                            Here's what's going on with your team
                        </p>
                    </div>
                </div>

                <div className="stat-grid">
                    {stats.map(stat => (
                        <div className="stat-card" key={stat.label}>
                            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="card">
                    <h2 style={{ marginBottom: "1rem", fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        Recent Tasks
                    </h2>
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks yet. Create one in the Tasks page.</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {tasks.slice(0, 5).map(task => (
                                <div key={task._id} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0.75rem 1rem",
                                    background: "var(--bg-elevated)",
                                    borderRadius: "10px",
                                    border: "1px solid var(--border)"
                                }}>
                                    <div>
                                        <p style={{ fontWeight: 500 }}>{task.title}</p>
                                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                                            {task.assignedTo ? task.assignedTo.name : "Unassigned"}
                                        </p>
                                    </div>
                                    <span className={`badge badge-${task.status === "Completed" ? "completed" : task.status === "In Progress" ? "progress" : "pending"}`}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;