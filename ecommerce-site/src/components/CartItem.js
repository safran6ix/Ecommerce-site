import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-quantity">
                <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                >
                    -
                </button>
                <span>{item.quantity}</span>
                <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                    disabled={item.quantity >= item.stock}
                >
                    +
                </button>
            </div>

            <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
                onClick={() => removeFromCart(item.id)}
                className="remove-item"
            >
                <TrashIcon />
            </button>
        </div>
    );
};

export default CartItem;