import React, { ChangeEvent, useState } from 'react';
import { RecordOrderDataForm, useRecordOrderContext } from './contexts/RecordOrderContext';
import { CartItemType } from './contexts/CartContext';

interface CheckoutProps {
    customerId: string;
    cartItems: CartItemType[];
    getTotalPrices: () => number;
}

const Checkout = ({ customerId, cartItems, getTotalPrices }: CheckoutProps) => {
    const { addOrderRecord } = useRecordOrderContext();
    const [shippingOption, setShippingOption] = useState('default');
    const [giftCode, setGiftCode] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip_code: '',
    });
    const [deliveryDate, setDeliveryDate] = useState({
        start_date: '',
        end_date: '',
        note: '',
    });

    // Shipping cost based on the option
    const shippingCosts: { [key: string]: number } = {
        default: 0,
        standard: 5,
        express: 10,
    };

    const handleShippingChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setShippingOption(event.target.value);
    };

    const handleGiftCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGiftCode(event.target.value);
    };

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDeliveryAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDeliveryDate((prev) => ({ ...prev, [name]: value }));
    };

    const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDeliveryDate((prev) => ({ ...prev, note: event.target.value }));
    };

    // Calculate total price including shipping cost
    const calculateTotalPrice = () => {
        const basePrice = getTotalPrices();
        const shippingCost = shippingCosts[shippingOption];
        return basePrice + shippingCost;
    };

    const handleCheckout = async () => {
        const orderRecord: RecordOrderDataForm = {
            customer_id: customerId,
            products: cartItems.map(item => ({
                product_id: item.id,
                quantity: item.quantity,
                unit_price: item.price,
            })),
            total_price: calculateTotalPrice(),
            order_date: new Date().toISOString(),
            delivery_address: deliveryAddress,
            delivery_date: deliveryDate,
            status: 'Pending',
        };

        await addOrderRecord(orderRecord);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-medium border-b border-b-gray-400 mb-4 pb-4">Summary</h2>
            <div>
                <div className="flex justify-between mb-4">
                    <p>Total items:</p>
                    <p>{cartItems.length}</p>
                </div>
                <div className="mb-4">
                    <span className="block mb-2">Shipping</span>
                    <select
                        value={shippingOption}
                        onChange={handleShippingChange}
                        className="w-full border p-2 rounded-md"
                    >
                        <option value="default">Local delivery $0.00</option>
                        <option value="standard">Standard shipping $5.00</option>
                        <option value="express">Express shipping $10.00</option>
                    </select>
                </div>
                <div className="mb-4">
                    <span className="block mb-2">Gift Code</span>
                    <input
                        type="text"
                        value={giftCode}
                        onChange={handleGiftCodeChange}
                        placeholder="Enter your gift code"
                        className="w-full border p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Delivery Address</h3>
                    <input
                        type="text"
                        name="street"
                        value={deliveryAddress.street}
                        onChange={handleAddressChange}
                        placeholder="Street"
                        className="w-full border p-2 rounded-md mb-2"
                    />
                    <input
                        type="text"
                        name="city"
                        value={deliveryAddress.city}
                        onChange={handleAddressChange}
                        placeholder="City"
                        className="w-full border p-2 rounded-md mb-2"
                    />
                    <input
                        type="text"
                        name="state"
                        value={deliveryAddress.state}
                        onChange={handleAddressChange}
                        placeholder="State"
                        className="w-full border p-2 rounded-md mb-2"
                    />
                    <input
                        type="text"
                        name="zip_code"
                        value={deliveryAddress.zip_code}
                        onChange={handleAddressChange}
                        placeholder="ZIP Code"
                        className="w-full border p-2 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Delivery Date</h3>
                    <input
                        type="date"
                        name="start_date"
                        value={deliveryDate.start_date}
                        onChange={handleDateChange}
                        className="w-full border p-2 rounded-md mb-2"
                    />
                    <input
                        type="date"
                        name="end_date"
                        value={deliveryDate.end_date}
                        onChange={handleDateChange}
                        className="w-full border p-2 rounded-md mb-2"
                    />
                    <textarea
                        name="note"
                        value={deliveryDate.note}
                        onChange={handleNoteChange}
                        placeholder="Additional notes"
                        className="w-full border p-2 rounded-md"
                    />
                </div>
                <div className="flex justify-between mb-4">
                    <p>Total price:</p>
                    <p>${calculateTotalPrice().toFixed(2)}</p>
                </div>
                <button
                    onClick={handleCheckout}
                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Checkout;
