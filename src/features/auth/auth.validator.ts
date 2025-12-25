import { z as zod } from 'zod'
import {AuthLoginBody, AuthRegisterBody} from "./auth.types.js";

const emailTemplate = zod.email("Email is invalid!").min(5, 'Email must be at least 5 characters').max(200)
const registerPasswordTemplate = zod.string().min(8, 'Password must be at least 8 characters').max(200)
const loginPasswordTemplate = zod.string().min(1, 'Password is required')

// middlewares
export function validateRegister(body: AuthRegisterBody) {
    const template = zod.object({ email: emailTemplate, password: registerPasswordTemplate })
    const res = template.safeParse(body)
    if (!res.success) {
        const error = res.error.issues[0]
        throw new Error(error.message)
    }
    return res.data
}

export function validateLogin(body: AuthLoginBody) {
    const template = zod.object({ email: emailTemplate, password: loginPasswordTemplate })
    const res = template.safeParse(body)
    if (!res.success) {
        const error = res.error.issues[0]
        throw new Error(error.message)
    }
    return res.data
}



