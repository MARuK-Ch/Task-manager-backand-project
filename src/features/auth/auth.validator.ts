import { z as zod } from 'zod';
import {AuthLoginBody, AuthRegisterBody} from "./auth.types";

const emailTemplate = zod.email("Email is invalid!").min(5, "Email must be at least 5 characters!").max(200)
const registerPasswordTemplate = zod.string().min(8, "Password must be at least 8 characters!").max(200)
const loginPasswordTemplate = zod.string().min(1, "Password is required")
const nameTemplate = zod.string().min(1, "Name is required").max(200).optional()


export function validateRegister(body: AuthRegisterBody) {
    const template = zod.object({ email: emailTemplate, password: registerPasswordTemplate,  name: nameTemplate });
    const res = template.safeParse(body)
    if (!res.success) {
        const error = res.error.issues[0]
        throw new Error(error.message)
    }
    return res.data
}

export function validateLogin(body: ReadableStream<Uint8Array<ArrayBuffer>> | null) {
    const template = zod.object({ email: emailTemplate, password: loginPasswordTemplate });
    const res = template.safeParse(body)
    if (!res.success) {
        const error = res.error.issues[0]
        throw new Error(error.message)
    }
    return res.data
}