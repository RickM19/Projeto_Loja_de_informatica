import axios from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus, SquarePen, Trash2 } from "lucide-react";
import type FormTarget from "@/utils/formTarget";
import { Separator } from "@/components/ui/separator";
import { ProductForm } from "@/components/productForm";
import { DialogTrigger } from "@radix-ui/react-dialog";

const PRODUCTS_URL = "/product";
const token = localStorage.getItem("accessToken");

type Product = {
    id: string;
    code: string;
    name: string;
    description: string;
    value: number;
    stock: number;
};

export const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(PRODUCTS_URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);

    const errRef = useRef(null);

    const [formData, setFormData] = useState({
        id: "",
        code: "",
        name: "",
        description: "",
        value: 0,
        stock: 0
    });
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [formData]);

    const handleChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddProduct = async (e: FormEvent) => {
        e.preventDefault();
        const { code, name, description } = formData;
        const value = Number(formData.value);
        const stock = Number(formData.stock);
        const newPartialProduct: Partial<Product> = {
            code,
            name,
            description,
            value,
            stock
        };
        try {
            const response = await axios.post(
                PRODUCTS_URL,
                JSON.stringify(newPartialProduct),
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
            const newProduct: Product = { id, ...newPartialProduct } as Product;
            setProducts([...products, newProduct]);
            setFormData({
                id: "",
                code: "",
                name: "",
                description: "",
                value: 0,
                stock: 0
            });
        } catch (err: any) {
            setErrMsg(err.response.data.message);
            console.log(err.response.data);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(PRODUCTS_URL + "/" + id, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            setProducts(products.filter((product) => product.id != id));
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (id: string) => {
        const code = formData.code;
        const name = formData.name;
        const description = formData.description;
        const value = Number(formData.value);
        const stock = Number(formData.stock);
        let updated: Partial<Product> = {};
        if (code) updated.code = code;
        if (name) updated.name = name;
        if (description) updated.description = description;
        if (value) updated.value = value;
        if (stock) updated.stock = stock;
        console.log(id, updated);
        try {
            await axios.put(
                PRODUCTS_URL + "/" + id,
                JSON.stringify(updated),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            setFormData({
                id: "",
                code: "",
                name: "",
                description: "",
                value: 0,
                stock: 0
            });
            window.location.reload();
        } catch (err: any) {
            setErrMsg(err.response.data.message);
            console.log(err.response.data);
        }
    };

    const addProductTrigger = () => {
        return (
            <DialogTrigger asChild>
                <Button variant="outline">
                    <CirclePlus />
                    Novo Produto
                </Button>
            </DialogTrigger>
        );
    };

    const editProductTrigger = () => {
        return (
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <SquarePen></SquarePen>
                </Button>
            </DialogTrigger>
        );
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="gap-4">
                        <section className="flex align-middle justify-center mt-4">
                            <ProductForm
                                errMsg={errMsg}
                                errRef={errRef}
                                formData={formData}
                                handleChange={handleChange}
                                handleSubmit={handleAddProduct}
                                title="Novo produto"
                                desc="Características do novo produto"
                                submitMsg="Adicionar"
                                triggerMsg="Novo produto"
                                TriggerComponent={addProductTrigger}
                            />
                        </section>
                        <section>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map(
                                    (item: Product, index: number) => (
                                        <div key={index} className="flex justify-between align-middle w-full">
                                            <div>
                                                <p className="text-muted-foreground">
                                                    {item.code}
                                                </p>
                                                <p className="font-bold">
                                                    {item.name}
                                                </p>
                                                <p className="text-muted-foreground">
                                                    {item.description}
                                                </p>
                                                <p>R$ {item.value}</p>
                                                <p>Estoque: {item.stock}</p>
                                            </div>
                                            <div>
                                                <Button
                                                    className="block"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        handleDelete(
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="text-red-600"></Trash2>
                                                </Button>
                                                <ProductForm
                                                    errMsg={errMsg}
                                                    errRef={errRef}
                                                    formData={formData}
                                                    handleChange={
                                                        handleChange
                                                    }
                                                    handleSubmit={() =>
                                                        handleUpdate(
                                                            item.id
                                                        )
                                                    }
                                                    title={"Editar produto"}
                                                    submitMsg="Salvar"
                                                    TriggerComponent={
                                                        editProductTrigger
                                                    }
                                                ></ProductForm>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </section>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};
