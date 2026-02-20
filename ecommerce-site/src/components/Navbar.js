import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Deals', href: '/deals' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo">
                    Shop<span>Hub</span>
                </Link>

                <div className="navbar-menu">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href} className="navbar-link">
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="navbar-icons">
                    <Link to="/cart" className="cart-icon">
                        <ShoppingCartIcon />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <Link to="/login" className="user-icon">
                        <UserIcon />
                    </Link>
                    <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <XMarkIcon /> : <Bars3Icon />}
                    </button>
                </div>

                {isOpen && (
                    <div className="mobile-menu">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="mobile-link"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;