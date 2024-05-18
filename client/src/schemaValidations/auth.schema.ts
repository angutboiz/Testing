import z from "zod";

const isValidAge = (yearString: string) => {
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(yearString, 10);
    const age = currentYear - birthYear;
    return age >= 16;
};

export const RegisterBody = z
    .object({
        name: z.string().trim().min(5, "Tên tài khoản phải trên 5 kí tự").max(256),
        email: z
            .string()
            .min(5, "Email phải có ít nhất 5 ký tự")
            .max(256, "Email không được vượt quá 256 ký tự")
            .regex(/^\S+$/, "Email không được chứa khoảng trắng")
            .regex(/^[^@]+@[^@]+\.[^@]+$/, "Email phải chứa ký tự '@' và có domain hợp lệ"),
        password: z
            .string()
            .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
            .max(100, "Mật khẩu không được vượt quá 100 ký tự")
            .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
            .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
            .regex(/[0-9]/, "Mật khẩu phải có ít nhất một số")
            .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt"),
        confirmPassword: z.string().min(8, "Không được bỏ trống").max(100),
        address: z.string().nonempty("Địa chỉ không được bỏ trống"),
        date: z
            .string()
            .regex(/^\d{4}$/, "Năm sinh chỉ chứa 4 kí tự và chứa số")
            .refine(isValidAge, { message: "Người dùng phải trên 16 tuổi" }),
        provine: z.string(),
        district: z.string(),
        ward: z.string(),
    })
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "Mật khẩu không khớp",
                path: ["confirmPassword"],
            });
        }
    });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
    data: z.object({
        token: z.string(),
        account: z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
            password: z.string(),
            confirmPassword: z.string(),
            address: z.string(),
            date: z.string(),
            provine: z.string(),
            district: z.string(),
            ward: z.string(),
        }),
    }),
    message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
    .object({
        email: z.string().email(),
        password: z.string().min(6).max(100),
    })
    .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const RefreshSessionBody = z.object({}).strict();

export type RefreshSessionBodyType = z.TypeOf<typeof RefreshSessionBody>;
export const RefreshSessionRes = RegisterRes;

export type RefreshSessionResType = z.TypeOf<typeof RefreshSessionRes>;
