import axios from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCpf } from "@/utils/formatCpf";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CUSTOMERS_URL = "/customer";
const token = localStorage.getItem("accessToken");

type Customer = {
    id: string;
    name: string;
    phone: string;
    cpf: string;
    address?: string;
};

export const ViewCustomer = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`${CUSTOMERS_URL}/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setCustomer(response.data);
            } catch (err) {
                setErrMsg("Erro ao carregar cliente.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    if (loading) return <div className="p-4">Carregando cliente...</div>;
    if (errMsg) return <div className="p-4 text-red-600">{errMsg}</div>;
    if (!customer) return <div className="p-4">Cliente não encontrado.</div>;

    return (
        <div className="h-full w-full flex justify-center items-center">
            <Card className="p-10 rounded-lg shadow-xl w-1/2 h-1/2">
                <CardHeader>
                    <CardTitle>Dados do Cliente:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <strong>Nome:</strong> {customer.name}
                    </div>
                    <div>
                        <strong>CPF:</strong> {formatCpf(customer.cpf)}
                    </div>
                    <div>
                        <strong>Telefone:</strong> {customer.phone}
                    </div>
                    <div>
                        <strong>Endereço:</strong>{" "}
                        {customer.address || "Não informado"}
                    </div>
                    <Link
                        to={"/customers"}
                        className="flex items-center gap-1 bg-primary w-fit text-white p-1 rounded-lg text-sm"
                    >
                        <ArrowLeft />
                        voltar
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};
