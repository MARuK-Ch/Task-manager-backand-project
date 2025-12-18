import bcrypt from 'bcrypt'
import { User, UserModel } from "../user/user.model"
import {AuthLoginBody, AuthRegisterBody} from "./auth.types"

interface AuthServiceInterface {
    login: (body: AuthLoginBody) => Promise<User>
    register: (body: AuthRegisterBody) => Promise<User>
}

export class AuthService implements AuthServiceInterface {
    async login(body: AuthLoginBody): Promise<User> {
        const foundUser = await UserModel.findOne({ email: body.email }).lean()

        if (!foundUser) {
            throw new Error('User with this email not found. Please register first.')
        }

        const isPasswordOk: boolean = await bcrypt.compare(body.password, foundUser.password)

        if (!isPasswordOk) {
            throw new Error('Invalid password.')
        }

        return foundUser

    }

    async register(body: AuthRegisterBody): Promise<User> {
        const foundUser = await UserModel.findOne({ email: body.email }).lean()

        if (foundUser) {
            throw new Error('User is already exists. Please login.')
        }

        const encryptedPassword: string = await bcrypt.hash(body.password, Number(process.env.SECRET_SALT))
        const newUser = await UserModel.create({ email: body.email, password: encryptedPassword, name: body.name })

        return newUser.toObject()

    }

}