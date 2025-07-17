import type { Order } from "@/screen/Order";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table";
import { Button } from "./ui/button";
import { formatCpf } from "@/utils/formatCpf";
import { Check, X } from "lucide-react";
import axios from "@/api/axios";
import * as axiosPkg from "axios";
import { toast } from "sonner";

const ORDERS_URL = "/order";
const token = localStorage.getItem("accessToken");

interface IProps {
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    display: Order[];
    setDisplay: React.Dispatch<React.SetStateAction<Order[]>>;
    setClosedDisplay: React.Dispatch<React.SetStateAction<Order[]>>;
}

export const OpenOrders = ({
    display,
    setDisplay,
    setOrders,
    setClosedDisplay
}: IProps) => {
    async function handleCloseOrder(id: string) {
        try {
            await axios.patch(
                ORDERS_URL + "/" + id + "/checkout",
                JSON.stringify({}),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            const orderToMove = display.find((order) => order.id === id);

            if (!orderToMove) return;
            orderToMove.status = "FINALIZADO";
            setClosedDisplay((closedDisplay) => [
                ...closedDisplay,
                orderToMove
            ]);
            setDisplay((display) => display.filter((order) => order.id != id));
        } catch (err: unknown) {
            if (axiosPkg.isAxiosError(err)) {
                toast(err.response?.data.message || "Erro desconhecido!");
            } else {
                toast("Erro Inesperado!");
            }
        }
    }

    async function handleDelete(id: string) {
        try {
            await axios.delete(ORDERS_URL + "/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setOrders((orders) => orders.filter((o) => o.id != id));
            setDisplay((display) => display.filter((order) => order.id != id));
        } catch (err: unknown) {
            if (axiosPkg.isAxiosError(err)) {
                toast(err.response?.data.message || "Erro desconhecido!");
            } else {
                toast("Erro Inesperado!");
            }
        }
    }

    return (
        <Table>
            <TableCaption>Pedidos em aberto.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[300px]">Status</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>{`Valor (R$)`}</TableHead>
                    <TableHead className="text-right pr-20">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {display.map((order) => {
                    return (
                        <TableRow>
                            <TableCell className="font-medium">
                                {order.status}
                            </TableCell>
                            <TableCell>
                                {order.customer
                                    ? order.customer.name
                                    : "EXCLUIDO"}
                            </TableCell>
                            <TableCell>
                                {order.customer
                                    ? formatCpf(order.customer.cpf)
                                    : "EXCLUIDO"}
                            </TableCell>
                            <TableCell>{`${order.total_amount} R$`}</TableCell>
                            <TableCell className="text-right space-x-1">
                                {order.customer && (
                                    <Button
                                        className=" hover:brightness-75"
                                        onClick={() =>
                                            handleCloseOrder(order.id)
                                        }
                                    >
                                        <Check />
                                        Finalizar
                                    </Button>
                                )}

                                <Button
                                    className="brightness-90 hover:brightness-75"
                                    variant={"destructive"}
                                    onClick={() => handleDelete(order.id)}
                                >
                                    <X />
                                    Cancelar
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
