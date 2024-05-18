"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
import { Cagliostro } from "next/font/google";
import envConfig from "@/config";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RegisterForm() {
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
            date: "",
            address: "",
            provine: "",
            district: "",
            ward: "",
        },
    });

    async function onSubmit(values: RegisterBodyType) {
        // const result = fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
        //     body: JSON.stringify(values),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     method: "POST",
        // }).then((res) => res.json());
        console.log(values);
    }

    const [cities, setCities] = useState<any>([]);
    const [district, setDistricts] = useState<any>([]);
    const [ward, setWards] = useState<any>([]);
    const [selectedCity, setSelectedCity] = useState<any>("");
    const [selectedDistrict, setSelectedDistrict] = useState<any>("");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
                setCities(response.data);
            } catch (error) {
                console.error("Error fetching cities: ", error);
            }
        };

        fetchCities();
    }, []);

    const handleCityChange = (value: any) => {
        console.log(value);

        setSelectedCity(value);

        const selectedCityData = cities.find((city: any) => city.Name === value);
        if (selectedCityData) {
            setDistricts(selectedCityData.Districts);
        }
    };

    const handleDistrictChange = (value: any) => {
        setSelectedDistrict(value);
        setWards([]);

        const selectedCityData = cities.find((city: any) => city.Name === selectedCity);
        const selectedDistrictData = selectedCityData?.Districts.find((district: any) => district.Name === value);
        if (selectedDistrictData) {
            setWards(selectedDistrictData.Wards);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="name"
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
                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập địa chỉ" {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />{" "}
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Năm sinh</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nhập Năm sinh" {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="provine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chọn tỉnh</FormLabel>
                                    <Select
                                        onValueChange={(e) => {
                                            field.onChange(e);
                                            handleCityChange(e);
                                        }}>
                                        <SelectTrigger id="city">
                                            <SelectValue placeholder="Chọn Tỉnh" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {cities.map((city: any) => (
                                                    <SelectItem key={city.Id} value={city.Name}>
                                                        {city.Name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />{" "}
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chọn huyện</FormLabel>
                                    <Select
                                        onValueChange={(e) => {
                                            field.onChange(e);
                                            handleDistrictChange(e);
                                        }}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Chọn huyện" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {district.map((city: any) => (
                                                    <SelectItem key={city.Id} value={city.Name}>
                                                        {city.Name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="ward"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chọn xã</FormLabel>
                                    <Select
                                        onValueChange={(e) => {
                                            field.onChange(e);
                                        }}>
                                        <SelectTrigger id="city">
                                            <SelectValue placeholder="Chọn xã" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {ward.map((city: any) => (
                                                    <SelectItem key={city.Id} value={city.Name}>
                                                        {city.Name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
