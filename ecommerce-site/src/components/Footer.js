import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Shop<span>Hub</span></h3>
                        <p>Your one-stop shop for everything you need. Quality products, best prices, fast delivery.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/deals">Deals</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/shipping">Shipping</Link></li>
                            <li><Link to="/returns">Returns</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact Info</h4>
                        <ul className="contact-info">
                            <li><EnvelopeIcon /> support@shophub.com</li>
                            <li><PhoneIcon /> +1 (555) 123-4567</li>
                            <li><MapPinIcon /> 123 Commerce St, NY 10001</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 ShopHub. All rights reserved.</p>
                    <div className="payment-methods">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>PayPal</span>
                        <span>Apple Pay</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;