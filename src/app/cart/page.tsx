"use client";
import Checkout from "@/components/CheckOut";
import { useCartContext } from "@/components/contexts/CartContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function CartPage() {
    const { cartItems, removeFromCart, updateCartItemQuantity } = useCartContext();
    const { data: session } = useSession();
    const userId = session?.user._id;

    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return; 
        updateCartItemQuantity(userId as string, itemId, newQuantity);
    };

    const getTotalPrices = () => {
        return cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
    };

    return (
        <div className="w-4/5 my-20 m-auto rounded-2xl shadow-2xl shadow-gray-400 flex justify-between bg-secondary">
            <div className="py-10 px-20 w-2/3 min-h[600px]">
                <h1 className="text-2xl font-bold mb-6 pb-4 border-b border-b-gray-400">Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((cart, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-400 pb-4">
                            <Image
                                src={cart.imageUrl}
                                alt={cart.name}
                                width={150}
                                height={200}
                                className="rounded-md"
                            />
                            <div className="ml-4 text-center">
                                <h3 className="text-xl font-medium">{cart.name}</h3>
                                <p>{cart.quantity} x ${cart.price}</p>
                                <div className="flex bg-primary rounded-lg max-w-32">
                                    <button
                                        className="px-3 py-2"
                                        onClick={() => handleQuantityChange(cart.id, cart.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        style={{ padding: 0, margin: 0 }}
                                        type="number"
                                        value={cart.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(cart.id, Number(e.target.value))}
                                        className="max-w-24 text-center border-none text-nowrap rounded-none"
                                    />
                                    <button
                                        className="px-3 py-2"
                                        onClick={() => handleQuantityChange(cart.id, cart.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                className="text-white bg-red-500 px-2 py-1 rounded-md hover:bg-red-600"
                                onClick={() => removeFromCart(userId as string, cart.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="w-1/3 py-10 px-5 bg-primary-light rounded-r-2xl">
                <h2 className="text-2xl font-medium border-b border-b-gray-400 mb-4 pb-4">Summary</h2>
                <Checkout customerId={userId as string} cartItems={cartItems} getTotalPrices={getTotalPrices} />
            </div>
        </div>
    );
}
