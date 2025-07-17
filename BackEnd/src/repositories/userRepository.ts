import { dataSource } from "@/common/typeorm";
import { User } from "@/entities/User";

export const userRepository = dataSource.getRepository(User);