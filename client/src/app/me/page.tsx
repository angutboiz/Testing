"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RegisterDetailBody,
  RegisterDetailType,
} from "@/schemaValidations/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import router from "next/router";
import axios from "axios";
import envConfig from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useStore from "@/lib/store";
import Link from "next/link";

export default function MeProfile() {
  const [imageSrc, setImageSrc] = useState<any>("");
  const user = useStore((state: any) => state.user);
  const [profile, setProfile] = useState<any>([]);

  async function GetProfile() {
    try {
      const res = await axios.get(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/profile`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await GetProfile();
        setProfile(data);
      } catch (err) {}
    };

    fetchProfile();
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const form = useForm<RegisterDetailType>({
    resolver: zodResolver(RegisterDetailBody),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      date: "",
      provine: "",
      district: "",
      ward: "",
      avatar: "",
    },
  });
  async function onSubmit(values: RegisterDetailType) {
    try {
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/profile`,
        {
          body: JSON.stringify({
            firstname: values.firstname,
            lastname: values.lastname,
            city: values.provine, //tỉnh
            provine: values.district, //huyện
            address: values.ward, //xã
            phoneNumber: values.phonenumber,
            birthday: values.date, // ngày sinh
            avatar: values.avatar,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        toast({
          variant: "destructive",
          title: "Bạn chưa đăng nhập",
        });
      } else if (response.status === 403) {
        toast({
          variant: "destructive",
          title: "Bạn đã thay đổi rồi, không thay đổi được nữa",
        });
      } else {
        toast({
          variant: "success",
          title: "Cập nhật thành công!",
        });
        router.push("/me");
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
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities: ", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (value: any) => {
    setSelectedCity(value);

    const selectedCityData = cities.find((city: any) => city.Name === value);
    if (selectedCityData) {
      setDistricts(selectedCityData.Districts);
    }
  };

  const handleDistrictChange = (value: any) => {
    setSelectedDistrict(value);
    setWards([]);

    const selectedCityData = cities.find(
      (city: any) => city.Name === selectedCity
    );
    const selectedDistrictData = selectedCityData?.Districts.find(
      (district: any) => district.Name === value
    );
    if (selectedDistrictData) {
      setWards(selectedDistrictData.Wards);
    }
  };
  if (!user) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center">
        <h1>Bạn chưa đăng nhập?</h1>
        <Link className="italic text-sm text-blue-500" href="/login">
          Nhấn vào đây để đăng nhập
        </Link>
      </div>
    );
  }
  return (
    <div className="h-[80vh]">
      <div className="flex items-center justify-center h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            noValidate
            encType="multipart/form-data"
          >
            <Tabs defaultValue="account" className="w-[700px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Tài khoản</TabsTrigger>
                <TabsTrigger value="password">Mật khẩu</TabsTrigger>
              </TabsList>
              {user && user.data.onboarding ? (
                <TabsContent value="account">
                  <Card>
                    <div className="flex justify-between items-center">
                      <CardHeader>
                        <CardTitle>Tài khoản</CardTitle>
                        <CardDescription>
                          Thay đổi thông tin tài khoản của bạn{" "}
                          {user.data.username}{" "}
                        </CardDescription>
                      </CardHeader>

                      <div className="pr-5 flex gap-3 items-center">
                        <div className="">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={imageSrc}
                              alt="@shadcn"
                              className="object-cover"
                            />
                            <AvatarFallback></AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="w-[150px]">
                          <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    id="picture"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/png, image/gif, image/jpeg, image/jpg"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />{" "}
                        </div>
                      </div>
                    </div>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between gap-5">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Họ lót</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập họ lót"
                                    {...field}
                                    value={profile.firstname}
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />{" "}
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Họ tên</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập họ tên"
                                    {...field}
                                    type="text"
                                  />
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
                            name="phonenumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập số điện thoại"
                                    {...field}
                                    type="number"
                                  />
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
                                  <Input
                                    placeholder="Nhập Năm sinh"
                                    {...field}
                                    type="number"
                                  />
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
                                  }}
                                >
                                  <SelectTrigger id="city">
                                    <SelectValue placeholder="Chọn Tỉnh" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {cities.map((city: any) => (
                                        <SelectItem
                                          key={city.Id}
                                          id={city.Id}
                                          value={city.Name}
                                        >
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
                                  }}
                                >
                                  <SelectTrigger className="">
                                    <SelectValue placeholder="Chọn huyện" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {district.map((city: any) => (
                                        <SelectItem
                                          key={city.Id}
                                          id={city.Id}
                                          value={city.Name}
                                        >
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
                                  }}
                                >
                                  <SelectTrigger id="city">
                                    <SelectValue placeholder="Chọn xã" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {ward.map((city: any) => (
                                        <SelectItem
                                          key={city.Id}
                                          value={city.Name}
                                        >
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
                    <CardFooter className="flex justify-end">
                      <Button type="submit">Lưu</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ) : (
                <TabsContent value="account">
                  <Card>
                    <div className="flex justify-between items-center">
                      <CardHeader>
                        <CardTitle>Tài khoản</CardTitle>
                        <CardDescription>Thay đổi </CardDescription>
                      </CardHeader>

                      <div className="pr-5 flex gap-3 items-center">
                        <div className="">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={imageSrc}
                              alt="@shadcn"
                              className="object-cover"
                            />
                            <AvatarFallback>TA</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="w-[150px]">
                          <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    id="picture"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/png, image/gif, image/jpeg, image/jpg"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />{" "}
                        </div>
                      </div>
                    </div>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between gap-5">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Họ</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập họ"
                                    {...field}
                                    type="text"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />{" "}
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tên</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập tên"
                                    {...field}
                                    type="text"
                                  />
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
                            name="phonenumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Nhập số điện thoại"
                                    {...field}
                                    type="number"
                                  />
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
                                  <Input
                                    placeholder="Nhập Năm sinh"
                                    {...field}
                                    type="number"
                                  />
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
                                  }}
                                >
                                  <SelectTrigger id="city">
                                    <SelectValue placeholder="Chọn Tỉnh" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {cities.map((city: any) => (
                                        <SelectItem
                                          key={city.Id}
                                          id={city.Id}
                                          value={city.Name}
                                        >
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
                                  }}
                                >
                                  <SelectTrigger className="">
                                    <SelectValue placeholder="Chọn huyện" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {district.map((city: any) => (
                                        <SelectItem
                                          key={city.Id}
                                          id={city.Id}
                                          value={city.Name}
                                        >
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
                                  }}
                                >
                                  <SelectTrigger id="city">
                                    <SelectValue placeholder="Chọn xã" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {ward.map((city: any) => (
                                        <SelectItem
                                          key={city.Id}
                                          value={city.Name}
                                        >
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
                    <CardFooter className="flex justify-end">
                      <Button type="submit">Lưu</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              )}

              <TabsContent value="password">
                <Card>
                  <CardHeader>
                    <CardTitle>Mật khẩu</CardTitle>
                    <CardDescription>
                      Thay đổi mật khẩu ở đây, sau khi thay đổi bạn sẽ log out
                    </CardDescription>
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
