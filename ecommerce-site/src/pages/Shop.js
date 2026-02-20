import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { products } from '../data/products';
import { FunnelIcon } from '@heroicons/react/24/outline';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['all', ...new Set(products.map(p => p.category))];

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const searchParam = searchParams.get('search');

        let filtered = [...products];

        // Filter by category
        if (categoryParam && categoryParam !== 'all') {
            filtered = filtered.filter(p => p.category === categoryParam);
            setSelectedCategory(categoryParam);
        }

        // Filter by search
        if (searchParam) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchParam.toLowerCase()) ||
                p.description.toLowerCase().includes(searchParam.toLowerCase())
            );
        }

        // Filter by price range
        filtered = filtered.filter(p =>
            p.price >= priceRange.min && p.price <= priceRange.max
        );

        // Sort products
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        setFilteredProducts(filtered);
    }, [searchParams, selectedCategory, sortBy, priceRange]);

    return (
        <div className="shop-page">
            <div className="container">
                <div className="shop-header">
                    <h1>Shop All Products</h1>
                    <SearchBar />
                </div>

                <button
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FunnelIcon />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                <div className={`shop-content ${showFilters ? 'filters-show' : ''}`}>
                    <aside className="filters-sidebar">
                        <h3>Categories</h3>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>

                        <h3>Sort By</h3>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>

                        <h3>Price Range</h3>
                        <div className="price-range">
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                            />
                            <span>to</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                            />
                        </div>

                        <button
                            className="btn"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSortBy('default');
                                setPriceRange({ min: 0, max: 1000 });
                            }}
                        >
                            Clear Filters
                        </button>
                    </aside>

                    <main className="products-main">
                        <p className="results-count">{filteredProducts.length} products found</p>
                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Shop;