import { UserLogin,UserRegister } from "../models/puzzle-model";

export function userSerializer(user: any): UserLogin {
    return {
        username: user.username,
        password: user.password
    };
}
export function userRegisterSerializer(user: any): UserRegister {
    return {
        username: user.username,
        password: user.password,
        email: user.email
    };
}