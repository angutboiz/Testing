import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType, RegisterThreeField } from "@/schemaValidations/auth.schema";
import http from "./http";

const authApiRequest = {
    login: (body: LoginBodyType) => http.post<LoginResType>("/auth/login", body),
    register: (body: RegisterThreeField) => http.post<RegisterThreeField>("/users", body),
};

export default authApiRequest;
