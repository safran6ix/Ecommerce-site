import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { TrashIcon } from '@heroicons/react/24/outline';

const Cart = () => {
    const { cartItems, cartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <div className="container">
                    <h2>Your Cart is Empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/shop" className="btn">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    const subtotal = cartTotal;
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="cart-page">
            <div className="container">
                <h1>Shopping Cart</h1>

                <div className="cart-content">
                    <div className="cart-items-section">
                        <div className="cart-header">
                            <button onClick={clearCart} className="clear-cart">
                                <TrashIcon />
                                Clear Cart
                            </button>
                        </div>

                        <div className="cart-items">
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>

                        <div className="summary-row">
                            <span>Tax (8%):</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" className="btn checkout-btn">
                            Proceed to Checkout
                        </Link>

                        <Link to="/shop" className="continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;