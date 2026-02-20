import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <h1>Welcome to ShopHub</h1>
                    <p>Discover amazing products at unbeatable prices. Shop the latest trends and best deals!</p>
                    <div className="hero-buttons">
                        <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                        <Link to="/deals" className="btn btn-secondary">View Deals</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600"
                        alt="Shopping"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;