"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBodyType, LoginBody } from "@/schemaValidations/auth.schema";
import { Cagliostro } from "next/font/google";
import envConfig from "@/config";
import { useToast } from "@/components/ui/use-toast";

export default function LoginForm() {
    const { toast } = useToast();

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginBodyType) {
        try {
            const result = fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }).then(async (res) => {
                const payload = await res.json();

                const data = {
                    status: res.status,
                    payload,
                };
                if (!res.ok) {
                    throw data;
                }
                return data;
            });
            toast({
                description: "Login Success",
            });
            console.log(result);
        } catch (error: any) {
            const errors = error.payload.errirs as {
                field: string;
                message: string;
            }[];
            const status = error.status as number;

            if (status === 422) {
                errors.forEach((error) => {
                    form.setError(error.field as "email" | "password", {
                        type: "server",
                        message: error.message,
                    });
                });
            } else {
                toast({
                    title: "Lỗi",
                    description: error.payload.message,
                    variant: "destructive",
                });
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập password" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />{" "}
                <Button type="submit">Đăng nhập</Button>
            </form>
        </Form>
    );
}
