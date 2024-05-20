"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterBody, RegisterBodyType, RegisterThreeField } from "@/schemaValidations/auth.schema";
import envConfig from "@/config";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: RegisterThreeField) {
        try {
            const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/users`, {
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                credentials: "include",
            });

            if (response.status === 409) {
                toast({
                    variant: "destructive",
                    title: "Tên người dùng hoặc mật khẩu đã đăng ký",
                });
            } else if (response.status === 400) {
                toast({
                    variant: "destructive",
                    title: "Tên tài khoản không được viết hoa, không có khoảng trống, không kí tự đặc biệt",
                });
            } else {
                toast({
                    variant: "success",
                    title: "Đăng ký thành công!",
                });
                router.push("/login");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Đã xảy ra lỗi trong quá trình kết nối tới server.",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tài khoản</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập tài khoản (VD: trongandev)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />{" "}
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập email của bạn (VD: example@gmail.com)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />{" "}
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập mật khẩu" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />{" "}
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập lại mật khẩu" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Button type="submit">Đăng kí</Button>
            </form>
        </Form>
    );
}
