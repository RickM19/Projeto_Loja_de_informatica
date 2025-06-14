import { BadRequestError } from "@/common/errors/AppError";
import { userRepository } from "@/repositories/userRepository";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "process";

export class UserController {
    async create(req: Request, res: Response) {
        const {name, email, password} = req.body;

        const userExists = await userRepository.findOneBy({email});

        if(userExists) {
            throw new BadRequestError("Email já existe");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({name, email, password: hashPassword});

        await userRepository.save(newUser);

        const {password: _, ...user} = newUser;

        res.status(201).json(user);

        return;
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;

        const user = await userRepository.findOneBy({email});

        if(!user) {
            throw new BadRequestError("Email ou senha inválidos");
        }

        const verifyPass = await bcrypt.compare(password, user.password);

        if(!verifyPass) {
            throw new BadRequestError("Email ou senha inválidos");
        }

        const token = jwt.sign({id: user.id}, env.JWT_PASS ?? '', {expiresIn: '8h'});

        const {password: _, ...userLogin} = user;

        res.json({
            user: userLogin,
            token: token
        });

        return;
    }

    async getProfile(req: Request, res: Response) {
        res.json(req.user);
        return;
    }
}