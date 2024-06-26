"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBodyType, LoginBody } from "@/schemaValidations/auth.schema";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import envConfig from "@/config";

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginBodyType) {
    try {
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status === 400) {
        toast({
          variant: "destructive",
          title: "Tên tài khoản hoặc mật khẩu sai?",
        });
      } else if (response.status === 429) {
        toast({
          variant: "destructive",
          duration: 60000, // 1 mins
          title: "Bạn đã đăng nhập quá nhiều, vui lòng thử lại sau 1 phút",
        });
      } else if (response.ok) {
        toast({
          variant: "success",
          title: "Đăng nhập thành công!",
        });
        router.push("/");
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 "
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập email của bạn (VD: example@gmail.com)"
                  {...field}
                />
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
