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
import { Download } from "lucide-react";
import { pdfGenerator } from "@/utils/pdfGenerator";
import axios from "@/api/axios";

const ORDER_SUMMARY_URL = "/order/summary/";
const token = localStorage.getItem("accessToken");

interface IProps {
    display: Order[];
}

export const ClosedOrders = ({ display }: IProps) => {
    const generatePdf = async (id: string) => {
        try {
            const response = await axios.get(ORDER_SUMMARY_URL + id, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            const order = response.data;
            const pdf = pdfGenerator(order);
            pdf.save(`pedido-${order.order_id}.pdf`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Table>
            <TableCaption>Pedidos em aberto.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>{`Valor (R$)`}</TableHead>
                    <TableHead className="text-right pr-10">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {display.map((order, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell>
                                {formatCpf(order.customer.cpf)}
                            </TableCell>
                            <TableCell>{`${order.total_amount} R$`}</TableCell>
                            <TableCell className="text-right space-x-1">
                                <Button
                                    onClick={() => generatePdf(order.id)}
                                    className=" hover:brightness-75"
                                >
                                    Recibo
                                    <Download />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
