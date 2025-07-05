import axios from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

const PRODUCTS_URL="/product"
const token = localStorage.getItem('accessToken');

type Product = {
    id: String;
    code: String;
    name: String;
    description: String;
    value: number;
    stock: number;
}

export const Products = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(PRODUCTS_URL, {
                    headers: { 'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                     },
                    withCredentials: true
                });
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [])


    // const handleAddProduct = () => {
    //     if (inputValue.trim()) {
    //     setProducts([...products, inputValue]); // Add the new item to the list
    //     setInputValue(""); // Clear the input field
    //     }
    // };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {products.map((item: Product, index: number) => (
                            <li key={index}>
                                <div className="mb-4">
                                    <p className="text-muted-foreground">{item.code}</p>
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-muted-foreground">{item.description}</p>
                                    <p>R$ {item.value}</p>
                                    <p>Estoque: {item.stock}</p>
                                </div>
                            </li>
                        )) }
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}