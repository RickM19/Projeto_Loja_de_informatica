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

interface IProps {
    display: Order[];
}

export const ClosedOrders = ({ display }: IProps) => {
    return (
        <Table>
            <TableCaption>Pedidos em aberto.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[300px]">Status</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>{`Valor (R$)`}</TableHead>
                    <TableHead className="text-right pr-10">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {display.map((order) => {
                    return (
                        <TableRow>
                            <TableCell className="font-medium">
                                {order.status}
                            </TableCell>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell>
                                {formatCpf(order.customer.cpf)}
                            </TableCell>
                            <TableCell>{`${order.total_amount} R$`}</TableCell>
                            <TableCell className="text-right space-x-1">
                                <Button className=" hover:brightness-75">
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
