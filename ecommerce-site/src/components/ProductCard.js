import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-image">
                <img src={product.image} alt={product.name} />
                {product.stock < 10 && (
                    <span className="stock-badge">Only {product.stock} left</span>
                )}
            </Link>

            <div className="product-info">
                <Link to={`/product/${product.id}`} className="product-name">
                    {product.name}
                </Link>
                <div className="product-category">{product.category}</div>
                <div className="product-rating">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                    <span>({product.rating})</span>
                </div>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                >
                    <ShoppingCartIcon />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;