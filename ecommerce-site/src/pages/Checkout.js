import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
        } else {
            // Process payment
            toast.success('Order placed successfully!');
            clearCart();
            navigate('/');
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    const subtotal = cartTotal;
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>

                <div className="checkout-steps">
                    <div className={`step ${step >= 1 ? 'active' : ''}`}>
                        <span>1</span>
                        <p>Shipping</p>
                    </div>
                    <div className={`step ${step >= 2 ? 'active' : ''}`}>
                        <span>2</span>
                        <p>Payment</p>
                    </div>
                </div>

                <div className="checkout-content">
                    <form onSubmit={handleSubmit} className="checkout-form">
                        {step === 1 ? (
                            <>
                                <h2>Shipping Information</h2>

                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>ZIP Code *</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <h2>Payment Information</h2>

                                <div className="form-group">
                                    <label>Card Number *</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Name on Card *</label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date *</label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV *</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="form-actions">
                            {step === 2 && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </button>
                            )}
                            <button type="submit" className="btn">
                                {step === 1 ? 'Continue to Payment' : 'Place Order'}
                            </button>
                        </div>
                    </form>

                    <div className="order-summary">
                        <h3>Your Order</h3>
                        <div className="order-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="order-item">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;