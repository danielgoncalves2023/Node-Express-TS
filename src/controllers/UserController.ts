import { Request, Response } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { AppDataSource } from '../database'

export class UserController {
    userService: UserRepository

    constructor(userService = new UserRepository(AppDataSource.manager)){
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body

        if(!user.name || !user.email || !user.password){
            return response.status(400).json({ message: `Bad request! Todos os campos são obrigatórios` })
        } else {
            this.userService.createUser(user.name, user.email, user.password)
            return response.status(201).json({ message: `Usuário criado` })
            }
    }
    
    getUserById = async (request: Request, response: Response) => {
        const userID = await request.body.id_user
        const user = await this.userService.getUserById(userID)

        if(user){
            console.log(`Usuário encontrado = name: ${user.name}, email: ${user.email}.`)
            return response.status(201).json({ user })
        } else {
            return response.status(404).json({ message: `Usuário não encontrado.` })
        }
    }

    deleteUser = async (request: Request, response: Response) => {
        const userReq = request.body
        const user = await this.userService.getUserById(userReq.id_user)

        if(userReq.id_user == user?.id_user && userReq.password == user?.password){
            this.userService.deleteUser(userReq.id_user)
            return response.status(201).json({ message: `Usuário deletado.` })

        } else {
        return response.status(400).json({ message: `Erro: Usuário ou senha incorretos.` })

        }
    }
}