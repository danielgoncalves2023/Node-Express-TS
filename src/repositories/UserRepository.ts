import { EntityManager } from "typeorm";
import User from "../entities/User";

export class UserRepository {
    private manager: EntityManager

    constructor(
        manager: EntityManager
    ){
        this.manager = manager
    }

    createUser = async (name: string, email: string, password: string) => {
        const user = new User(name, email, password)

        return this.manager.save(user)
    }

    getUserById = async (userID: string): Promise<User | null> => {
        return this.manager.findOne(User, {
            where: {
                id_user: userID
            }
        })
    }

    deleteUser = async (userID: string) => {
        return this.manager.delete(User, userID)
    }
}