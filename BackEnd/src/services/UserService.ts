import { BadRequestError } from '@/common/errors/AppError';
import {
    loginSchema,
    userOptionalSchema,
    userSchema,
} from '@/common/http/schemas/userSchema';
import { User } from '@/entities/User';
import { userRepository } from '@/repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';
import { z } from 'zod';

export class UserService {
    async create(args: Partial<User>) {
        const _user = userSchema.safeParse(args);

        if (!_user.success)
            throw new BadRequestError('Campo obrigatório faltando');

        const { name, email, password } = _user.data;

        const userExists = await userRepository.findOneBy({ email });

        if (userExists) {
            throw new BadRequestError('Email já cadastrado');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            name,
            email,
            password: hashPassword,
        });

        await userRepository.save(newUser);

        const { password: _, ...user } = newUser;
    }

    async login(args: Partial<User>) {
        const _user = loginSchema.safeParse(args);

        if (!_user.success)
            throw new BadRequestError('Campo obrigatório faltando');

        const { email, password } = _user.data;

        const user = await userRepository.findOneBy({ email });

        if (!user) {
            throw new BadRequestError('Email ou senha inválidos');
        }

        const verifyPass = await bcrypt.compare(password, user.password);

        if (!verifyPass) {
            throw new BadRequestError('Email ou senha inválidos');
        }

        const token = jwt.sign({ id: user.id }, env.JWT_PASS ?? '', {
            expiresIn: '8h',
        });

        const { password: _, ...userLogin } = user;

        const result = {
            user: userLogin,
            token: token,
        };

        return result;
    }

    async update(args: Partial<User>, currentUser: Partial<User>) {
        const _user = userOptionalSchema.safeParse(args);

        if (!_user.success) throw new BadRequestError('Dados inválidos');

        const id = currentUser.id;
        const oldUser = await userRepository.findOneBy({ id });

        if (!oldUser) {
            throw new BadRequestError('Email não cadastrado');
        }

        const emailExists =
            _user.data.email &&
            (await userRepository.findOneBy({ email: _user.data.email }));

        if (emailExists) throw new BadRequestError('Email já cadastrado');

        const name = _user.data.name ? _user.data.name : oldUser.name;
        const email = _user.data.email ? _user.data.email : oldUser.email;
        const password = _user.data.password
            ? _user.data.password
            : oldUser.password;

        const hashPassword = password
            ? await bcrypt.hash(password, 10)
            : oldUser.password;

        await userRepository.update(id, {
            name,
            email,
            password: hashPassword,
        });
    }

    async delete(id: string) {
        const _id = z.string().uuid().safeParse(id);
        if (!_id.success) throw new BadRequestError('Id inválido');

        const existingUser = await userRepository.findOneBy({ id });

        if (!existingUser) throw new BadRequestError('Usuário não cadastrado');

        await userRepository.delete(existingUser);
    }
}
