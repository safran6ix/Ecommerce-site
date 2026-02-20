import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));

        // Update cart count and total
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        setCartCount(count);
        setCartTotal(total);
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                toast.success(`Added another ${product.name} to cart`);
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            toast.success(`${product.name} added to cart`);
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => {
            const item = prevItems.find(i => i.id === productId);
            toast.success(`${item.name} removed from cart`);
            return prevItems.filter(item => item.id !== productId);
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        toast.success('Cart cleared');
    };

    const value = {
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};