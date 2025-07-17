import axios from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CUSTOMERS_URL = "/customer";
const PRODUCTS_URL = "/product";
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
    created_at: string;
    updated_at: Date;
};

export const Home = () => {
    const [customersCount, setCustomersCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);
    const [totalToday, setTotalToday] = useState(0);
    const [lastOrder, setLastOrder] = useState("");

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

                setOrdersCount(response.data.length);
                const today = new Date().toISOString().split("T")[0];
                const total = response.data
                    .filter((order: Order) =>
                        order.created_at.startsWith(today)
                    )
                    .reduce(
                        (acc: number, order: Order) =>
                            acc + Number(order.total_amount),
                        0
                    );
                setTotalToday(total);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(ORDERS_URL + "/last", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setLastOrder(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(CUSTOMERS_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setCustomersCount(response.data.length);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomers();

        const fetchProducts = async () => {
            try {
                const response = await axios.get(PRODUCTS_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setProductsCount(response.data.length);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Bem-vindo ao Sistema de Vendas
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Vendas Hoje
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            R$ {totalToday.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Última venda: {lastOrder}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Produtos
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {productsCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Total cadastrados
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Clientes
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {customersCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Clientes ativos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pedidos
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ordersCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Total de pedidos feitos
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to={"/orders"}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Nova Venda
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Iniciar um novo pedido de venda
                            </p>
                        </CardContent>
                    </Card>
                </Link>
                <Link to={"/customers"}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Cadastrar Cliente
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Adicionar novo cliente ao sistema
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link to={"/products"}>
                    <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Gerenciar Produtos
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Visualizar e editar produtos
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
};
