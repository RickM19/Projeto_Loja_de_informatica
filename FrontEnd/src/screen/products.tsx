import axios from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, CirclePlus, SquarePen, Trash2 } from "lucide-react";
import type FormTarget from "@/utils/formTarget";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const PRODUCTS_URL="/product"
const token = localStorage.getItem('accessToken');

type Product = {
    id: string;
    code: string;
    name: string;
    description: string;
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

    const errRef = useRef(null);
     
    const [formData, setFormData] = useState({
        id: '',
        code: '',
        name: '',
        description: '',
        value: 0,
        stock: 0
    });
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [formData]);

    const handleChange = (e: FormEvent) => {
        const { name, value } = e.target as FormTarget;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleAddProduct = async (e: FormEvent) => {
        e.preventDefault();
        const {code, name, description} = formData;
        const value = Number(formData.value);
        const stock = Number(formData.stock);
        const newPartialProduct: Partial<Product> = {code, name, description, value, stock};
        try {
            const response = await axios.post(PRODUCTS_URL,
                JSON.stringify(newPartialProduct),
                {
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                     },
                    withCredentials: true
                }
            );
            const id = response.data.id;
            const newProduct: Product = {id, ...newPartialProduct} as Product;
            setProducts([...products, newProduct]);
            setFormData({id: '',
                        code: '',
                        name: '',
                        description: '',
                        value: 0,
                        stock: 0})
        } catch (err: any) {
            setErrMsg(err.response.data.message);
            console.log(err.response.data);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(PRODUCTS_URL + "/" + id, {
                headers: { 'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                    }, 
                withCredentials: true
            });
            setProducts(products.filter(product => product.id != id));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="gap-4">
                        <section>
                            <ul>
                                {products.map((item: Product, index: number) => (
                                    <li key={index}>
                                        <div className="mb-4 mt-4 flex justify-between w-80 align-middle">
                                            <div>
                                                <p className="text-muted-foreground">{item.code}</p>
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-muted-foreground">{item.description}</p>
                                                <p>R$ {item.value}</p>
                                                <p>Estoque: {item.stock}</p>
                                            </div>
                                            <div>
                                                <Button className="block" variant="ghost" onClick={() => handleDelete(item.id)}><Trash2 className="text-red-600"></Trash2></Button>
                                                <Button variant="ghost"><SquarePen></SquarePen></Button>
                                            </div>
                                        </div>
                                        <Separator className="bg-muted-foreground"></Separator>
                                    </li>
                                )) }
                            </ul>
                        </section>
                        <section className="flex align-middle justify-center mt-4">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline"><CirclePlus/> Novo Produto</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    {errMsg &&
                                        <section>
                                            <Alert ref={errRef} variant="destructive">
                                                <AlertCircleIcon />
                                                <AlertTitle>{errMsg}</AlertTitle>
                                            </Alert>
                                        </section>
                                    }
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="leading-none font-medium">Novo produto</h4>
                                            <p className="text-muted-foreground text-sm">
                                            Defina as características do produto novo.
                                            </p>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="code">Código</Label>
                                            <Input
                                                id="code" name="code" value={formData.code} onChange={handleChange}
                                                className="col-span-2 h-8"
                                            />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="name">Nome</Label>
                                            <Input
                                                id="name" name="name" value={formData.name} onChange={handleChange}
                                                className="col-span-2 h-8"
                                            />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="description">Descrição</Label>
                                            <Input
                                                id="description" name="description" value={formData.description} onChange={handleChange}
                                                className="col-span-2 h-8"
                                            />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="value">Valor (R$)</Label>
                                            <Input
                                                id="value"
                                                name="value"
                                                type="number"
                                                value={formData.value} onChange={handleChange}
                                                className="col-span-2 h-8"
                                            />
                                            </div>
                                            <div className="grid grid-cols-3 items-center gap-4">
                                            <Label htmlFor="stock">Estoque</Label>
                                            <Input
                                                id="stock"
                                                name="stock"
                                                type="number"
                                                value={formData.stock} onChange={handleChange}
                                                className="col-span-2 h-8"
                                            />
                                            </div>
                                        </div>
                                        <Button type="submit" onClick={handleAddProduct}>Adicionar</Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </section>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}