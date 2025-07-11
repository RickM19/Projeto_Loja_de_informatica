import { z } from 'zod';

export const customerSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    cpf: z.string().length(11, 'CPF deve ter 11 dígitos'),
    phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
    address: z.string().optional(),
});
