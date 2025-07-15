import axios from "@/api/axios";
import { ClosedOrders } from "@/components/ClosedOrders";
import { OpenOrders } from "@/components/OpenOrders";
import { SearchBar } from "@/components/searchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type FormTarget from "@/utils/formTarget";
import { useEffect, useState, type FormEvent } from "react";

const ORDERS_URL = "/order";
const token = localStorage.getItem("accessToken");

type Customer = {
    id: string;
    name: string;
    phone: string;
    cpf: string;
    address?: string;
};

type Product = {
    id: string;
    name: string;
    code: string;
    description: string;
    imgUrl: string;
    stock: number;
    value: string;
};

type OrderProduct = {
    id: string;
    price: string;
    quantity: number;
    created_at: Date;
    updated_at: Date;
    product: Product;
};

export type Order = {
    id: string;
    customer: Customer;
    products: OrderProduct[];
    status: string;
    total_amount: string;
    created_at: Date;
    updated_at: Date;
};

export const Order = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [dislayOpenOrders, setDisplayOpenOrders] = useState<Order[]>([]);
    const [displayClosedOrders, setDisplayClosedOrders] = useState<Order[]>([]);
    const [searchFormData, setSearchFormData] = useState({
        cpf: ""
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(ORDERS_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                console.log(response.data);
                setOrders(response.data);
                setDisplayOpenOrders(
                    response.data.filter((o: Order) => o.status == "PENDENTE")
                );
                setDisplayClosedOrders(
                    response.data.filter((o: Order) => o.status == "FINALIZADO")
                );
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        const term = searchFormData.cpf.trim();

        if (term !== "") {
            setDisplayOpenOrders(
                orders.filter(
                    (o) =>
                        o.status === "PENDENTE" &&
                        o.customer.cpf.startsWith(term)
                )
            );
            setDisplayClosedOrders(
                orders.filter(
                    (o) =>
                        o.status === "FINALIZADO" &&
                        o.customer.cpf.startsWith(term)
                )
            );
        } else {
            setDisplayOpenOrders(orders.filter((o) => o.status === "PENDENTE"));
            setDisplayClosedOrders(
                orders.filter((o) => o.status === "FINALIZADO")
            );
        }
    }, [searchFormData.cpf, orders]);

    const handleSearchFormChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setSearchFormData({ ...searchFormData, [name]: value });
        console.log(searchFormData);
    };

    return (
        <>
            <SearchBar
                searchInputs={[
                    {
                        name: "cpf",
                        type: "text",
                        text: "CPF",
                        value: searchFormData.cpf,
                        placeholder: "Digite o CPF do cliente..."
                    }
                ]}
                handleChange={handleSearchFormChange}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="Open" className="w-full">
                        <TabsList>
                            <TabsTrigger value="Open">Pendentes</TabsTrigger>
                            <TabsTrigger value="Closed">
                                Finalizados
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="Open">
                            <OpenOrders
                                display={dislayOpenOrders}
                                setDisplay={setDisplayOpenOrders}
                                setOrders={setOrders}
                                setClosedDisplay={setDisplayClosedOrders}
                            />
                        </TabsContent>
                        <TabsContent value="Closed">
                            <ClosedOrders display={displayClosedOrders} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    );
};
