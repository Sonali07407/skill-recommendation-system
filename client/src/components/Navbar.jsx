import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

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
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link to="/" style={{ fontWeight: '500', color: isActive('/') ? 'var(--primary-color)' : 'var(--text-color)' }}>Home</Link>
                    <Link to="/dashboard" style={{ fontWeight: '500', color: isActive('/dashboard') ? 'var(--primary-color)' : 'var(--text-color)' }}>Dashboard</Link>
                    <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.2rem' }}>Login</Link>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem' }}>Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
