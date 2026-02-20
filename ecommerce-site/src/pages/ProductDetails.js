import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Find product and related products
    useEffect(() => {
        setLoading(true);

        // Find current product
        const currentProduct = products.find(p => p.id === parseInt(id));

        if (currentProduct) {
            setProduct(currentProduct);

            // Find related products (same category, exclude current product)
            const related = products
                .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
                .slice(0, 4);

            setRelatedProducts(related);
        }

        setLoading(false);
    }, [id]);

    // Check if product is in wishlist (from localStorage)
    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsWishlisted(wishlist.includes(parseInt(id)));
    }, [id]);

    const handleQuantityChange = (change) => {
        setQuantity(prev => {
            const newQuantity = prev + change;
            if (newQuantity < 1) return 1;
            if (product && newQuantity > product.stock) return product.stock;
            return newQuantity;
        });
    };

    const handleAddToCart = () => {
        if (!product) return;

        if (product.stock === 0) {
            toast.error('Product is out of stock');
            return;
        }

        addToCart(product, quantity);
        toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`);
    };

    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const productId = parseInt(id);

        if (isWishlisted) {
            const newWishlist = wishlist.filter(wId => wId !== productId);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
            toast.success('Removed from wishlist');
        } else {
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            toast.success('Added to wishlist');
        }

        setIsWishlisted(!isWishlisted);
    };

    const handleBuyNow = () => {
        if (!product) return;

        if (product.stock === 0) {
            toast.error('Product is out of stock');
            return;
        }

        // Add to cart and go to checkout
        addToCart(product, quantity);
        navigate('/checkout');
    };

    // Loading state
    if (loading) {
        return (
            <div className="container loading-state">
                <div className="loader"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    // Product not found
    if (!product) {
        return (
            <div className="container not-found">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <Link to="/shop" className="btn">Back to Shop</Link>
            </div>
        );
    }

    // Create array of images (if multiple, otherwise use single image)
    const productImages = product.images || [product.image];

    return (
        <div className="product-details-page">
            <div className="container">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="separator">/</span>
                    <Link to="/shop">Shop</Link>
                    <span className="separator">/</span>
                    <Link to={`/shop?category=${product.category}`}>
                        {product.category}
                    </Link>
                    <span className="separator">/</span>
                    <span className="current">{product.name}</span>
                </div>

                <div className="product-main">
                    {/* Product Images Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img
                                src={productImages[selectedImage]}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/500x500?text=Image+Not+Found';
                                }}
                            />
                            {product.stock < 10 && product.stock > 0 && (
                                <span className="stock-badge">Only {product.stock} left</span>
                            )}
                            {product.stock === 0 && (
                                <span className="out-of-stock-badge">Out of Stock</span>
                            )}
                        </div>

                        {productImages.length > 1 && (
                            <div className="thumbnail-grid">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={img} alt={`${product.name} - view ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="product-info-detailed">
                        <h1>{product.name}</h1>

                        <div className="product-meta">
                            <span className="category">
                                Category: <Link to={`/shop?category=${product.category}`}>
                                    {product.category}
                                </Link>
                            </span>
                            <span className="rating">
                                <div className="stars">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}>
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="rating-value">
                                    {product.rating} ({product.reviews || 0} reviews)
                                </span>
                            </span>
                            <span className="sku">
                                SKU: {product.sku || `PRD-${product.id}`}
                            </span>
                        </div>

                        <p className="description">{product.description}</p>

                        <div className="price-section">
                            <span className="current-price">${product.price.toFixed(2)}</span>
                            {product.oldPrice && (
                                <>
                                    <span className="old-price">${product.oldPrice.toFixed(2)}</span>
                                    <span className="discount">
                                        Save ${(product.oldPrice - product.price).toFixed(2)}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="stock-status">
                            {product.stock > 0 ? (
                                <>
                                    <span className="in-stock">✓ In Stock</span>
                                    <span className="stock-count">({product.stock} available)</span>
                                </>
                            ) : (
                                <span className="out-of-stock">✗ Out of Stock</span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        {product.stock > 0 && (
                            <div className="quantity-selector">
                                <label htmlFor="quantity">Quantity:</label>
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= product.stock}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="max-stock">Max: {product.stock}</span>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="product-actions">
                            <button
                                className="btn btn-primary"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                <ShoppingCartIcon />
                                Add to Cart
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={toggleWishlist}
                            >
                                {isWishlisted ? (
                                    <>
                                        <HeartIconSolid />
                                        Wishlisted
                                    </>
                                ) : (
                                    <>
                                        <HeartIcon />
                                        Add to Wishlist
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Buy Now Button */}
                        {product.stock > 0 && (
                            <button
                                className="btn btn-buy-now"
                                onClick={handleBuyNow}
                            >
                                Buy It Now
                            </button>
                        )}

                        {/* Product Features/Tabs */}
                        <div className="product-tabs">
                            <div className="tab-headers">
                                <button className="tab-header active">Details</button>
                                <button className="tab-header">Specifications</button>
                                <button className="tab-header">Shipping</button>
                            </div>

                            <div className="tab-content active">
                                <ul className="features-list">
                                    <li>✓ Free shipping on orders over $50</li>
                                    <li>✓ 30-day return policy</li>
                                    <li>✓ 1 year warranty</li>
                                    <li>✓ Secure checkout</li>
                                    <li>✓ 24/7 customer support</li>
                                </ul>
                            </div>
                        </div>

                        {/* Share Product */}
                        <div className="share-product">
                            <span>Share:</span>
                            <button className="share-btn" aria-label="Share on Facebook">📘</button>
                            <button className="share-btn" aria-label="Share on Twitter">🐦</button>
                            <button className="share-btn" aria-label="Share on Pinterest">📌</button>
                            <button className="share-btn" aria-label="Share via Email">📧</button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="related-products">
                        <h2>You might also like</h2>
                        <div className="products-grid">
                            {relatedProducts.map(p => (
                                <Link to={`/product/${p.id}`} key={p.id} className="related-product-card">
                                    <div className="related-product-image">
                                        <img src={p.image} alt={p.name} />
                                    </div>
                                    <div className="related-product-info">
                                        <h3>{p.name}</h3>
                                        <p className="price">${p.price.toFixed(2)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;