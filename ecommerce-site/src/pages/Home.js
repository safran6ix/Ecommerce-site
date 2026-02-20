import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
    const featuredProducts = products.slice(0, 4);

    return (
        <>
            <Hero />
            <Categories />

            <section className="featured-products">
                <div className="container">
                    <h2>Featured Products</h2>
                    <div className="products-grid">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="view-all">
                        <Link to="/shop" className="btn">View All Products</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;