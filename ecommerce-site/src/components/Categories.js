import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = [
        { name: 'Electronics', icon: '💻', count: 45 },
        { name: 'Fashion', icon: '👕', count: 32 },
        { name: 'Home', icon: '🏠', count: 28 },
        { name: 'Sports', icon: '⚽', count: 19 },
        { name: 'Books', icon: '📚', count: 15 },
        { name: 'Toys', icon: '🎮', count: 23 },
    ];

    return (
        <section className="categories">
            <div className="container">
                <h2>Shop by Category</h2>
                <div className="categories-grid">
                    {categories.map((category, index) => (
                        <Link to={`/shop?category=${category.name}`} key={index} className="category-card">
                            <span className="category-icon">{category.icon}</span>
                            <h3>{category.name}</h3>
                            <p>{category.count} products</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;