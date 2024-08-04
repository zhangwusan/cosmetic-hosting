"use client"
import { RecordOrderType } from "@/models/RecordOrder";
import { createContext, useContext, useEffect, useState } from "react";


export interface RecordOrderDataForm {
    order_id?: string,
    customer_id: string,
    products: {
        product_id: string,
        unit_price: number,
        quantity: number,
    }[],
    total_price: number,
    order_date: string,
    delivery_address: {
        street: string,
        city: string,
        state: string,
        zip_code: string,
    }
    delivery_date: {
        start_date: string,
        end_date: string,
        note: string
    },
    status: string
}

interface RecordOrderContextProps {
    recordOrders: RecordOrderType[];
    addOrderRecord: (recordOrder: RecordOrderDataForm) => Promise<void>;
    deleteOrderRecordById: (recordOrderId: string) => Promise<void>;
    updateOrderRecordById: (recordOrderId: string, recordOrder: RecordOrderDataForm) => Promise<void>;
}

const RecordOrderContext = createContext<RecordOrderContextProps | null>(null);

export default function RecordeOrderContextProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [recordOrders, setRecordOrders] = useState<RecordOrderType[]>([]);
    const recordOrderService = new ReocordOrderService();
    const getAllOrdersRecord = async () => {
        const records = await recordOrderService.getAll();
        return records;
    };
    const fetchRefreshRecord = async () => {
        const records = await getAllOrdersRecord();
        setRecordOrders(records);
    }

    const addOrderRecord = async (recordOrder: RecordOrderDataForm): Promise<void> => {
        await recordOrderService.add(recordOrder);
        fetchRefreshRecord();
    };

    const deleteOrderRecordById = async (recordOrderId: string): Promise<void> => {
        await recordOrderService.delete(recordOrderId);
        fetchRefreshRecord();
    };

    const updateOrderRecordById = async (recordOrderId: string, recordOrder: RecordOrderDataForm): Promise<void> => {
        await recordOrderService.update(recordOrderId, recordOrder);
        fetchRefreshRecord();
    };


    useEffect(() => {
        fetchRefreshRecord();
    }, [])
    return (
        <RecordOrderContext.Provider
            value={{
                recordOrders,
                addOrderRecord,
                deleteOrderRecordById,
                updateOrderRecordById
            }}
        >
            {children}
        </RecordOrderContext.Provider>
    );
}

export const useRecordOrderContext = () => {
    const context = useContext(RecordOrderContext);
    if (!context) {
        throw new Error("useRecordOrderContext must be used within a RecordOrderContextProvider");
    }
    return context;
}


class ReocordOrderService {
    async getAll(): Promise<RecordOrderType[]> {
        try {
            const response = await fetch("/api/recordOrder");
            const records = await response.json();
            return records;
        } catch (error) {
            console.error("Failed to fetch record orders:", error);
            return [];
        }
    }
    async add(recordOrder: RecordOrderDataForm): Promise<void> {
        try {
            await fetch("/api/recordOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recordOrder),
            });
        } catch (error) {
            console.error("Failed to add record order:", error);
        }
    }
    async delete(recordOrderId: string): Promise<void> {
        try {
            await fetch(`/api/recordOrder/${recordOrderId}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error("Failed to delete record order:", error);
        }
    }
    async update(recordOrderId: string, recordOrder: RecordOrderDataForm): Promise<void> {
        try {
            await fetch(`/api/recordOrder/${recordOrderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recordOrder),
            });
        } catch (error) {
            console.error("Failed to update record order:", error);
        }
    }
}


