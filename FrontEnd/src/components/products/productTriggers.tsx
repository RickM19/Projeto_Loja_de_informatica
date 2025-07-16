import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { CirclePlus, SquarePen } from "lucide-react";

export const AddProductTrigger = () => {
    return (
        <DialogTrigger asChild>
            <Button variant="outline">
                <CirclePlus />
                Novo Produto
            </Button>
        </DialogTrigger>
    );
};

export const EditProductTrigger = () => {
    return (
        <DialogTrigger asChild>
            <Button variant="ghost">
                <SquarePen></SquarePen>
            </Button>
        </DialogTrigger>
    );
};