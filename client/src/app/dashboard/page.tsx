"use client";
import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserNav } from "./UI/user-nav";

export default function Dashboard() {
    // const data: Payment[] = [
    //     {
    //         id: "m5gr84i9",
    //         amount: 316,
    //         status: "success",
    //         email: "ken99@yahoo.com",
    //     },
    //     {
    //         id: "3u1reuv4",
    //         amount: 242,
    //         status: "success",
    //         email: "Abe45@gmail.com",
    //     },
    //     {
    //         id: "derv1ws0",
    //         amount: 837,
    //         status: "processing",
    //         email: "Monserrat44@gmail.com",
    //     },
    //     {
    //         id: "5kma53ae",
    //         amount: 874,
    //         status: "success",
    //         email: "Silas22@gmail.com",
    //     },
    //     {
    //         id: "bhqecj4p",
    //         amount: 721,
    //         status: "failed",
    //         email: "carmella@hotmail.com",
    //     },
    // ];

    // export type Payment = {
    //     id: string;
    //     amount: number;
    //     status: "pending" | "processing" | "success" | "failed";
    //     email: string;
    // };

    return (
        <>
            <div className="md:hidden">
                <Image src="/examples/dashboard-light.png" width={1280} height={866} alt="Dashboard" className="block dark:hidden" />
                <Image src="/examples/dashboard-dark.png" width={1280} height={866} alt="Dashboard" className="hidden dark:block" />
            </div>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <Tabs defaultValue="overview" className="space-y-4 ">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">Manage Account</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground">
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$45,231.89</div>
                                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+2350</div>
                                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground">
                                            <rect width="20" height="14" x="2" y="5" rx="2" />
                                            <path d="M2 10h20" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12,234</div>
                                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+573</div>
                                        <p className="text-xs text-muted-foreground">+201 since last hour</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-4">
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pl-2"></CardContent>
                                </Card>
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Recent Sales</CardTitle>
                                        <CardDescription>You made 265 sales this month.</CardDescription>
                                    </CardHeader>
                                    <CardContent></CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent value="analytics" className="space-y-4">
                            <div className="">
                                <div className="md:hidden">
                                    <Image src="/examples/tasks-light.png" width={1280} height={998} alt="Playground" className="block dark:hidden" />
                                    <Image src="/examples/tasks-dark.png" width={1280} height={998} alt="Playground" className="hidden dark:block" />
                                </div>
                                <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                                    <div className="flex items-center justify-between space-y-2">
                                        <div>
                                            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                                            <p className="text-muted-foreground">Here&apos;s a list of your tasks for this month!</p>
                                        </div>
                                    </div>
                                    {/* <DataTable data={tasks} columns={columns} /> */}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="reports" className="space-y-4">
                            <div className="">reports</div>
                        </TabsContent>
                        <TabsContent value="notifications" className="space-y-4">
                            <div className="">notifications</div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
