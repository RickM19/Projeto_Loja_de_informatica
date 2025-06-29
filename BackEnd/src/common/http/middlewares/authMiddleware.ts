import { AppError, BadRequestError, UnauthorizedError } from "@/common/errors/AppError";
import { userRepository } from "@/repositories/userRepository";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";

type JwtPayload = {
    id: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    
            if(!authorization) {
                throw new UnauthorizedError('Não autorizado');
            }
    
            const token = authorization.split(' ')[1];
    
            let id: string;

            try {
                const payload = jwt.verify(token, env.JWT_PASS ?? '') as JwtPayload;
                id = payload.id;
            } catch(err) {
                throw new BadRequestError("Token inválido");
            }
    
            const user = await userRepository.findOneBy({id});
    
            if(!user) {
                throw new UnauthorizedError("Não autorizado");
            }
    
            const {password: _, ...loggedUser} = user;
    
            // res.json(loggedUser);
            
            req.user = loggedUser;

            next();
}