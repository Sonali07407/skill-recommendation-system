import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar" style={{
            backgroundColor: 'var(--white)',
            boxShadow: 'var(--shadow)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                    Skill<span style={{ color: 'var(--secondary-color)' }}>Rec</span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ fontWeight: '500', color: isActive('/') ? 'var(--primary-color)' : 'var(--text-color)' }}>Home</Link>
                    {token ? (
                        <>
                            <Link to="/dashboard" style={{ fontWeight: '500', color: isActive('/dashboard') ? 'var(--primary-color)' : 'var(--text-color)' }}>Dashboard</Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                                    alt="Profile"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
                                    title={user?.name}
                                />
                                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
