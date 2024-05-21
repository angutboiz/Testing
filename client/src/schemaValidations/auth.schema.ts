import z from "zod";

const isValidAge = (yearString: string) => {
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(yearString, 10);
    const age = currentYear - birthYear;
    return age >= 16;
};

export const RegisterDetailBody = z
    .object({
        firstname: z.string().min(2, "Tên phải trên 2 kí tự").max(50, "Tên không được vượt quá 50 kí tự"),
        lastname: z.string().min(2, "Tên phải trên 2 kí tự").max(50, "Tên không được vượt quá 50 kí tự"),
        phonenumber: z.string().regex(/^0\d{9}$/, "Số điện thoại phải bắt đầu bằng số 0 và có tổng cộng 10 chữ số"),
        date: z
            .string()
            .regex(/^\d{4}$/, "Năm sinh chỉ chứa 4 kí tự và chứa số")
            .refine(isValidAge, { message: "Người dùng phải trên 16 tuổi" }),
        provine: z.string().min(5, "Không được bỏ trống").max(100),
        district: z.string().min(5, "Không được bỏ trống").max(100),
        ward: z.string().min(5, "Không được bỏ trống").max(100),
        avatar: z.string(),
    })
    .strict();

export type RegisterDetailType = z.TypeOf<typeof RegisterDetailBody>;

// export const RegisterRes = z.object({
//     data: z.object({
//         token: z.string(),
//         account: z.object({
//             id: z.number(),
//             username: z.string(),
//             firstname: z.string(),
//             lastname: z.string(),
//             email: z.string(),
//             password: z.string(),
//             confirmPassword: z.string(),
//             date: z.string(),
//             provine: z.string(),
//             district: z.string(),
//             ward: z.string(),
//             avatar: z.string(),
//         }),
//     }),
//     message: z.string(),
// });

// export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const RegisterThreeBody = z
    .object({
        username: z.string().trim().min(5, "Tên tài khoản phải trên 5 kí tự").regex(/^\S*$/, "Tên tài khoản không được chứa khoảng trắng").max(256, "Tên tài khoản không được vượt quá 256 ký tự"),

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
    })
    .strict();

export type RegisterThreeType = z.TypeOf<typeof RegisterThreeBody>;

export const LoginBody = z
    .object({
        email: z.string(),
        password: z.string(),
    })
    .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

// export const LoginRes = RegisterRes;

// export type LoginResType = z.TypeOf<typeof LoginRes>;
export const RefreshSessionBody = z.object({}).strict();

export type RefreshSessionBodyType = z.TypeOf<typeof RefreshSessionBody>;
// export const RefreshSessionRes = RegisterRes;

// export type RefreshSessionResType = z.TypeOf<typeof RefreshSessionRes>;
