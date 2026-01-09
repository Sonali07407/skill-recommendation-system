import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [targetRole, setTargetRole] = useState('Frontend Developer');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.user);
            } catch (err) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }, [navigate]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getRecommendations = async () => {
        if (!user) return;
        setLoading(true);
        setError('');
        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const res = await axios.post(`${apiUrl}/api/skills/recommend`, {
                userId: user.id,
                targetRole
            });
            setRecommendations(res.data);
            if (res.data.length === 0) {
                setError('No recommendations found for this role based on your current skills.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch recommendations. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <div className="page-header">
                <h2>Your Dashboard</h2>
                {user && <p>Welcome back! Ready to level up your skills?</p>}
            </div>

            <div className="card" style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Select Your Target Role</h3>
                    <p style={{ color: 'var(--text-light)' }}>We'll recommend the best skills for you.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        className="form-control"
                        style={{ minWidth: '250px' }}
                    >
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Mobile Developer">Mobile Developer</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                    </select>
                    <button onClick={getRecommendations} className="btn btn-primary" disabled={loading}>
                        {loading ? 'Loading...' : 'Get Recommendations'}
                    </button>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--secondary-color)' }}>Recommended Skills</h3>

            {error && (
                <div className="alert alert-danger" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#ffebee', color: '#c62828', borderRadius: 'var(--radius)' }}>
                    {error}
                </div>
            )}

            {recommendations.length === 0 && !loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#f9f9f9', borderRadius: 'var(--radius)' }}>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>Select a role and click "Get Recommendations" to see your path.</p>
                </div>
            ) : (
                <div className="grid">
                    {recommendations.map(skill => (
                        <div key={skill._id} className="card" style={{ borderTop: '4px solid var(--accent-color)', transition: 'var(--transition)' }}>
                            <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{skill.name}</h4>
                            <span style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                                color: 'var(--primary-color)',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                marginBottom: '1rem'
                            }}>
                                {skill.category}
                            </span>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                                Related: {skill.relatedSkills.join(', ')}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
