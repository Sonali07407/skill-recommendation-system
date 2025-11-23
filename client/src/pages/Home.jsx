import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <section className="hero" style={{
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)',
                color: 'var(--white)',
                padding: '6rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: '700' }}>Master Your Career Path</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Discover the exact skills you need to land your dream job in tech.
                        Our AI-powered recommendation engine guides your learning journey.
                    </p>
                    <Link to="/register" className="btn" style={{
                        backgroundColor: 'var(--white)',
                        color: 'var(--primary-color)',
                        padding: '1rem 2rem',
                        fontSize: '1.1rem'
                    }}>Get Started for Free</Link>
                </div>
            </section>

            <section className="features" style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div className="grid">
                        <div className="card" style={{ textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Personalized</h3>
                            <p>Get recommendations tailored to your current skill level and career goals.</p>
                        </div>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Data-Driven</h3>
                            <p>Our insights are based on real-time market data and industry trends.</p>
                        </div>
                        <div className="card" style={{ textAlign: 'center' }}>
                            <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Track Progress</h3>
                            <p>Monitor your learning journey and see how close you are to your target role.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
