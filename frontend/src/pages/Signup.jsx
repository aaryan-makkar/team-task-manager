import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../api";

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Member" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/auth/signup`, formData);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem"
        }}>
            <div style={{ width: "100%", maxWidth: "420px" }}>

                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "56px", height: "56px",
                        background: "var(--teal-glow)",
                        border: "1px solid var(--border-hover)",
                        borderRadius: "14px",
                        fontSize: "1.6rem",
                        marginBottom: "1rem"
                    }}>🚀</div>
                    <h1 style={{ marginBottom: "0.4rem" }}>Create account</h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                        Join your team's workspace
                    </p>
                </div>

                <div className="card">
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div className="form-group">
                            <label>Full name</label>
                            <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <select name="role" onChange={handleChange} value={formData.role}>
                                <option value="Member">Member</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        {error && (
                            <div style={{
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.3)",
                                color: "var(--danger)",
                                padding: "0.75rem 1rem",
                                borderRadius: "10px",
                                fontSize: "0.875rem"
                            }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }} disabled={loading}>
                            {loading ? "Creating account..." : "Create account →"}
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                    Already have an account?{" "}
                    <Link to="/">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;