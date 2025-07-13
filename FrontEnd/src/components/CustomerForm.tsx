import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useRef } from "react";

interface CustomerFormProps {
    errMsg: string;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: {
        id: string;
        name: string;
        phone: string;
        cpf: string;
        address?: string;
    };
    title: string;
    submitMsg: string;
    TriggerComponent: React.ReactElement;
}
export const CustomerForm = ({
    errMsg,
    handleChange,
    handleSubmit,
    formData,
    title,
    submitMsg,
    TriggerComponent
}: CustomerFormProps) => {
    const errRef = useRef(null);

    return (
        <Dialog>
            {TriggerComponent}
            <DialogContent className="fixed w-80 left-1/2 -translate-x-1/2">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {errMsg && (
                    <section>
                        <Alert ref={errRef} variant={"destructive"}>
                            <AlertCircleIcon />
                            <AlertTitle>{errMsg}</AlertTitle>
                        </Alert>
                    </section>
                )}
                <form
                    action="submit"
                    onSubmit={handleSubmit}
                    className="grid gap-4"
                >
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="name">Nome:</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="cpf">CPF:</Label>
                            <Input
                                id="cpf"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                className="col-span-2 h-8"
                            />
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="phone">Telefone:</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="address">Endereço:</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                    <Button className="cursor-pointer" type="submit">
                        {submitMsg}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
