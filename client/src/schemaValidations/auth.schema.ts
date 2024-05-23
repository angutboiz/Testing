import z from "zod";

const isValidAge = (dateString: any) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 16;
};

export const RegisterDetailBody = z
    .object({
        firstname: z.string().trim().min(1, "Họ không được để trống").max(50, "Họ không được vượt quá 50 kí tự"),
        lastname: z.string().trim().min(1, "Tên không được để trống").max(50, "Tên không được vượt quá 50 kí tự"),
        phonenumber: z.string().regex(/^0\d{9}$/, "Số điện thoại phải bắt đầu bằng số 0 và có tổng cộng 10 chữ số"),
        date: z.string().min(5, "Vui lòng nhập ngày sinh").refine(isValidAge, { message: "Người dùng phải trên 16 tuổi" }),
        city: z.string().min(5, "Không được bỏ trống").max(100),
        province: z.string().min(5, "Không được bỏ trống").max(100),
        address: z.string().min(5, "Không được bỏ trống").max(100),
        avatar: z.string(),
    })
    .strict();

export type RegisterDetailType = z.TypeOf<typeof RegisterDetailBody>;

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

export type RegisterThreeType = z.TypeOf<typeof RegisterThreeBody>;

export const LoginBody = z
    .object({
        email: z.string().min(1, "Không được bỏ trống"),
        password: z.string().min(1, "Không được bỏ trống"),
    })
    .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

// export const LoginRes = RegisterRes;

// export type LoginResType = z.TypeOf<typeof LoginRes>;
export const RefreshSessionBody = z.object({}).strict();

export type RefreshSessionBodyType = z.TypeOf<typeof RefreshSessionBody>;
// export const RefreshSessionRes = RegisterRes;

// export type RefreshSessionResType = z.TypeOf<typeof RefreshSessionRes>;
