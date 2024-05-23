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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import envConfig from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useStore from "@/lib/store";
import { useRouter } from "next/navigation";
import moment from "moment";

export default function MeProfile() {
  const [imageSrc, setImageSrc] = useState<any>("");
  const { setUser, user } = useStore();
  const router = useRouter();

  /** Handle form-data */
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setImageSrc(file);
  };

  const form = useForm<RegisterDetailType>({
    resolver: zodResolver(RegisterDetailBody),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      date: "",
      city: "",
      province: "",
      address: "",
      avatar: "",
    },
  });

  async function onSubmit(values: RegisterDetailType) {
    const formData = new FormData();
    formData.append("avatar", imageSrc || "");
    formData.append(
      "firstName",
      values.firstname.charAt(0).toUpperCase() + values.firstname.slice(1)
    );
    formData.append(
      "lastName",
      values.lastname.charAt(0).toUpperCase() + values.lastname.slice(1)
    );
    /**
     * city
     * province
     * address
     */
    formData.append("city", values.city);
    formData.append("province", values.province);
    formData.append("address", values.address);
    formData.append("phoneNumber", values.phonenumber);
    formData.append(
      "birthday",
      new Date(values.date).toISOString().slice(0, 10)
    );
    console.log("formData: ", formData.get("avatar"));
    try {
      const response = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/profile`,
        {
          body: formData,

          method: "POST",
          credentials: "include",
        }
      );

      switch (response.status) {
        case 401:
          toast({
            variant: "destructive",
            title: "Bạn chưa đăng nhập",
          });
          break;
        case 403:
          toast({
            variant: "destructive",
            title:
              "Tài khoản đã đăng ký `Profile`, vui lòng cập nhật nếu bạn muốn sửa đổi.",
          });
          break;

        case 400:
          toast({
            variant: "destructive",
            title: "Vui lòng kiểm tra lại các trường",
          });
          break;

        case 409:
          toast({
            variant: "destructive",
            title: "Số điện thoại đã được đăng ký",
          });
          break;

        default:
          toast({
            variant: "destructive",
            title: "Server hiện đang bận thử lại sau!",
          });
          router.push("/me");
      }
      if (response.ok) {
        toast({
          variant: "success",
          title: "Tạo thành công hồ sơ cá nhân!",
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

  /** Address data */
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

    /** Redirect user if onboarding = True */
    if (user && user?.data.onboarding === true) {
      return router.push("/me");
    }

    fetchCities();
  }, [user, router]);
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
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <div className="flex justify-between items-center">
                    <CardHeader>
                      <CardTitle>Tài khoản</CardTitle>
                      <CardDescription>
                        Thay đổi thông tin tài khoản của bạn{" "}
                      </CardDescription>
                    </CardHeader>

                    <div className="pr-5 flex gap-3 items-center">
                      <div className="">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src=""
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
                              <FormLabel>Họ</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nguyễn"
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
                                  placeholder="Văn A"
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
                              <FormLabel>Ngày sinh</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập ngày sinh"
                                  {...field}
                                  type="date"
                                  value={field.value}
                                  min="1960-01-01"
                                  max={moment().format("YYYY-MM-DD")}
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
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chọn Thành Phố / Tỉnh</FormLabel>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(e);
                                  handleCityChange(e);
                                }}
                              >
                                <SelectTrigger id="city">
                                  <SelectValue placeholder="Chọn Thành Phố / Tỉnh" />
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
                          name="province"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chọn quận / huyện</FormLabel>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(e);
                                  handleDistrictChange(e);
                                }}
                              >
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Chọn quận / huyện" />
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
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chọn xã</FormLabel>
                              <Select
                                onValueChange={(e) => {
                                  field.onChange(e);
                                }}
                              >
                                <SelectTrigger id="city">
                                  <SelectValue placeholder="Chọn phường / xã" />
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
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
}
