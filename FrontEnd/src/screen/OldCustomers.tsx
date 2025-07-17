import axios from "@/api/axios";

import { SearchBar } from "@/components/searchBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type FormTarget from "@/utils/formTarget";
import { useEffect, useState, type FormEvent } from "react";
import { formatCpf } from "@/utils/formatCpf";

import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OLD_CUSTOMERS_URL = "/customer/old";
const token = localStorage.getItem("accessToken");

type Customer = {
    id: string;
    name: string;
    phone: string;
    cpf: string;
    address?: string;
    deleted_at: Date;
};

export const OldCustomer = () => {
    const [displayCustomers, setDisplayCustomers] = useState<Customer[]>([]);
    const [searchFormData, setSearchFormData] = useState({ name: "", cpf: "" });
    const [oldCustomers, setOldCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(OLD_CUSTOMERS_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setOldCustomers(response.data);
                setDisplayCustomers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomers();
    }, []);

    const handleSearchFormChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setSearchFormData({ ...searchFormData, [name]: value });
        console.log(searchFormData);
        if (name == "cpf" && value != "") {
            setDisplayCustomers(
                oldCustomers.filter((c) => c.cpf.startsWith(value))
            );
        } else if (name == "name" && value != "") {
            setDisplayCustomers(
                oldCustomers.filter((c) => c.name.startsWith(value))
            );
        } else {
            setDisplayCustomers(oldCustomers);
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
                    <CardTitle>Clientes antigos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant={"outline"} className="p-0 w-fit h-fit">
                        <Link
                            to={"/customers"}
                            className="flex  items-center gap-1 underline h-full w-full p-2"
                        >
                            <ArrowLeft /> Voltar
                        </Link>
                    </Button>
                </CardContent>
            </Card>
            <div className="p-4 mt-2 grid grid-cols-4 text-center">
                <span className="col-span-1">Nome</span>
                <span className="col-span-1">CPF</span>
                <span className="col-span-1">Contato</span>
                <span className="col-span-1">Data de exclusão</span>
            </div>
            <Separator />
            <ul>
                {displayCustomers.map((c, index) => {
                    return (
                        <li
                            className=" p-4 mt-2 shadow-md grid grid-cols-4 text-center"
                            key={index}
                        >
                            <span className="col-span-1">{c.name}</span>
                            <span className="col-span-1">
                                {formatCpf(c.cpf)}
                            </span>
                            <span className="col-span-1">{c.phone}</span>
                            <span className="col-span-1">
                                {new Date(c.deleted_at).toLocaleString("pt-BR")}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
