"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import authApiRequest from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import router from "next/router";
import axios from "axios";

export default function MeProfile() {
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: "",
            username: "",
            firstname: "",
            lastname: "",
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
        try {
            const response = await authApiRequest.register(values);
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
        <div className="h-[80vh]">
            <div className="flex items-center justify-center h-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
                        <Tabs defaultValue="account" className="w-[700px]">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">Tài khoản</TabsTrigger>
                                <TabsTrigger value="password">Mật khẩu</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Tài khoản</CardTitle>
                                        <CardDescription>Thay đổi thông tin tài khoản của bạn</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex gap-5">
                                            <div className="flex-1">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" defaultValue="Pedro Duarte" />
                                            </div>
                                            <div className="flex-1">
                                                <Label htmlFor="username">Username</Label>
                                                <Input id="username" defaultValue="@peduarte" />
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
                                                                            <SelectItem key={city.Id} id={city.Id} value={city.Name}>
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
                                                                            <SelectItem key={city.Id} id={city.Id} value={city.Name}>
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
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save changes</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                            <TabsContent value="password">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Mật khẩu</CardTitle>
                                        <CardDescription>Thay đổi mật khẩu ở đây, sau khi thay đổi bạn sẽ log out</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="current">Current password</Label>
                                            <Input id="current" type="password" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="new">New password</Label>
                                            <Input id="new" type="password" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Save password</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </form>
                </Form>
            </div>
        </div>
    );
}
