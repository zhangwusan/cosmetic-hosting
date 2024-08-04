"use client";
import { ProductType } from "@/models/Product";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect, useReducer } from "react";
export interface CartItemType {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string;
    totalPrice: number;
    discount: number;
}

interface CartProps {
    cartItems: CartItemType[];
    addToCart: (userId: string, productCart: ProductType) => Promise<void>;
    removeFromCart: (userId: string, productId: string) => Promise<void>;
    clearCart: () => void;
    updateCartItemQuantity: (userId: string, productId: string, quantity: number) => void;
}

const CartContext = createContext<CartProps | null>(null);

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartContextProvider");
    }
    return context;
}

class CartService {
    async addToCart(userId: string, productCart: ProductType) {
        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productCart }),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return "the cart was added successfully";
        } catch (error) {
            console.error("Failed to add product to cart:", error);
            throw new Error("Failed to add product to cart");
        }
    }

    async removeFromCart(userId: string, productId: string) {
        try {
            const response = await fetch("/api/cart", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to remove product from cart:", error);
            throw new Error("Failed to remove product from cart");
        }
    }

    async getCart(userId: string) {
        try {
            const response = await fetch(`/api/cart?userId=${userId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            throw new Error("Failed to fetch cart");
        }
    }
}

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);
    const cartService = new CartService();
    const { data: session } = useSession();

    const fetchCartItems = async () => {
        if (session?.user?._id) {
            try {
                const cartData = await cartService.getCart(session.user._id);
                const carts = cartData.cart.map(async (c: any) => {
                    const response = await fetch(`/api/products/${c.id}`)
                    const product = await response.json();
                    console.log(c.quantity)
                    return {
                        id: c.id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        quantity: c.quantity,
                        imageUrl: product.images_url[0],
                        totalPrice: product.price * c.quantity,
                        discount: product.discount,
                    } as CartItemType;
                });
                const formattedCartItems = await Promise.all(carts);
                setCartItems(formattedCartItems);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [session?.user?._id]);

    const addToCart = async (userId: string, productCart: ProductType) => {
        try {
            await cartService.addToCart(userId, productCart);
            await fetchCartItems();
        } catch (error) {
            console.error("Failed to add product to cart:", error);
        }
    };

    const removeFromCart = async (userId: string, productId: string) => {
        try {
            await cartService.removeFromCart(userId, productId);
            await fetchCartItems();
        } catch (error) {
            console.error("Failed to remove product from cart:", error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const updateCartItemQuantity = (userId: string, itemId: string, newQuantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
}
