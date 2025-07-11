import { Button } from "./ui/button"
import { AlertCircleIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog"
import { Alert, AlertTitle } from "./ui/alert"
import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { DialogTitle } from "@radix-ui/react-dialog"

export const ProductForm = ({errMsg, errRef, formData, handleChange, handleSubmit, title, submitMsg, TriggerComponent}: any) => {
    return (
        <Dialog>
            <TriggerComponent></TriggerComponent>
            <DialogContent className="w-80 absolute left-1/2 -translate-x-1/2">
                <DialogHeader>
                    <DialogTitle className="font-bold">{title}</DialogTitle>
                </DialogHeader>
                {errMsg &&
                    <section>
                        <Alert ref={errRef} variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>{errMsg}</AlertTitle>
                        </Alert>
                    </section>
                }
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
                    <Label htmlFor="imgUrl">Url da imagem</Label>
                    <Input
                        id="imgUrl" name="imgUrl" value={formData.imgUrl} onChange={handleChange}
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
                <Button type="submit" onClick={handleSubmit}>{submitMsg}</Button>
            </DialogContent>
        </Dialog>
    )
}