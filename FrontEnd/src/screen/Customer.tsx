import axios from "@/api/axios";
import * as axiosPkg from "axios";
import { CustomerForm } from "@/components/CustomerForm";
import { SearchBar } from "@/components/searchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type FormTarget from "@/utils/formTarget";
import { useEffect, useState, type FormEvent } from "react";
import { formatCpf } from "@/utils/formatCpf";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const CUSTOMERS_URL = "/customer";
const token = localStorage.getItem("accessToken");

type Customer = {
    id: string;
    name: string;
    phone: string;
    cpf: string;
    address?: string;
};

const defaultObject = {
    id: "",
    name: "",
    phone: "",
    cpf: "",
    address: ""
};

const AddCustomerTrigger = () => {
    return (
        <DialogTrigger asChild>
            <Button className="bg-primary text-white cursor-pointer">
                <UserPlus />
                Cadastrar Cliente
            </Button>
        </DialogTrigger>
    );
};

const EditCustomerTrigger = () => {
    return (
        <DialogTrigger asChild>
            <Button className="cursor-pointer hover:brightness-75">
                <Pencil />
                Editar
            </Button>
        </DialogTrigger>
    );
};

export const Customer = () => {
    const [formData, setFormData] = useState(defaultObject);
    const [displayCustomers, setDisplayCustomers] = useState<Customer[]>([]);
    const [searchFormData, setSearchFormData] = useState({ name: "", cpf: "" });
    const [customers, setcustomers] = useState<Customer[]>([]);
    const [errMsg, setErrMsg] = useState("");

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
                setcustomers(response.data);
                setDisplayCustomers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomers();
    });

    useEffect(() => setErrMsg(""), [formData]);

    const handleSearchFormChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setSearchFormData({ ...searchFormData, [name]: value });
        console.log(searchFormData);
        if (name == "cpf" && value != "") {
            setDisplayCustomers(
                customers.filter((c) => c.cpf.startsWith(value))
            );
        } else if (name == "name" && value != "") {
            setDisplayCustomers(
                customers.filter((c) => c.name.startsWith(value))
            );
        } else {
            setDisplayCustomers(customers);
        }
    };

    const handleFormChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    };

    const handleAddCustomer = async (e: FormEvent) => {
        e.preventDefault();
        const { name, address, phone, cpf } = formData;

        const newPartialCustomer: Partial<Customer> = {
            name,
            cpf,
            address,
            phone
        };
        try {
            const response = await axios.post(
                CUSTOMERS_URL,
                JSON.stringify(newPartialCustomer),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            const id = response.data.id;
            console.log("Id: " + id);
            const newCustomer: Customer = {
                id,
                ...newPartialCustomer
            } as Customer;
            setcustomers([...customers, newCustomer]);
            setDisplayCustomers([...displayCustomers, newCustomer]);
            setFormData({
                id: "",
                name: "",
                cpf: "",
                phone: "",
                address: ""
            });
        } catch (err: unknown) {
            if (axiosPkg.isAxiosError(err)) {
                setErrMsg(err.response?.data.message || "Erro desconhecido");
                console.log(err.response?.data);
            } else {
                setErrMsg("Erro inesperado");
                console.error(err);
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(CUSTOMERS_URL + "/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setcustomers(customers.filter((customer) => customer.id != id));
            setDisplayCustomers(
                customers.filter((customer) => customer.id != id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e: FormEvent, id: string) => {
        e.preventDefault();
        const { name, cpf, address, phone } = formData;
        const updated: Partial<Customer> = {};
        if (name) updated.name = name;
        if (cpf) updated.cpf = cpf;
        if (address) updated.address = address;
        if (phone) updated.phone = phone;

        try {
            await axios.put(CUSTOMERS_URL + "/" + id, JSON.stringify(updated), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setFormData({
                id: "",
                name: "",
                cpf: "",
                address: "",
                phone: ""
            });
            window.location.reload();
        } catch (err: unknown) {
            if (axiosPkg.isAxiosError(err)) {
                setErrMsg(err.response?.data.message || "Erro desconhecido");
                console.log(err.response?.data);
            } else {
                setErrMsg("Erro inesperado");
                console.error(err);
            }
        }
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
                    },
                    {
                        name: "name",
                        type: "text",
                        text: "Nome",
                        value: searchFormData.name,
                        placeholder: "Digite o nome completo..."
                    }
                ]}
                handleChange={handleSearchFormChange}
            />
            <Card>
                <CardHeader>
                    <CardTitle>Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <CustomerForm
                        errMsg={errMsg}
                        handleChange={handleFormChange}
                        formData={formData}
                        handleSubmit={handleAddCustomer}
                        TriggerComponent={<AddCustomerTrigger />}
                        title="Novo Cliente"
                        submitMsg="Cadastrar"
                    ></CustomerForm>
                </CardContent>
            </Card>
            <div className="p-4 mt-2 flex justify-between">
                <div className="flex justify-around max-w-1/2 w-full">
                    <span>Nome</span>
                    <span>CPF</span>
                </div>
                <span className="mr-24">Ações</span>
            </div>
            <Separator />
            <ul>
                {displayCustomers.map((c, index) => {
                    return (
                        <li
                            className=" p-4 mt-2 shadow-md flex justify-between "
                            key={index}
                        >
                            <div className="flex justify-around mb-2 max-w-1/2 w-full">
                                <span>{c.name}</span>
                                <span>{formatCpf(c.cpf)}</span>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    to={`/customers/${c.id}`}
                                    className="flex items-center text-white p-2 bg-primary rounded-lg hover:brightness-75"
                                >
                                    <Eye />
                                </Link>
                                <CustomerForm
                                    errMsg={errMsg}
                                    handleChange={handleFormChange}
                                    formData={formData}
                                    handleSubmit={(e: FormEvent) =>
                                        handleUpdate(e, c.id)
                                    }
                                    TriggerComponent={<EditCustomerTrigger />}
                                    title="Atualizar Cliente"
                                    submitMsg="Atualizar"
                                ></CustomerForm>
                                <Button
                                    variant={"destructive"}
                                    className="cursor-pointer hover:brightness-75"
                                    onClick={() => handleDelete(c.id)}
                                >
                                    <Trash2 />
                                    Excluir
                                </Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
