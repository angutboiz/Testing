"use client";
import React from "react";
import { ToggleBtn } from "./toggle-btn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Header() {
    const pathname = usePathname();
    return (
        <div className="px-[64px] py-2 bg-[#1c1c36] flex justify-between items-center">
            <ul className="flex gap-5 items-center">
                <li>
                    <ToggleBtn />
                </li>
                <li>
                    <Link
                        href="/"
                        className={`${
                            pathname === "/" ? "bg-gray-700" : ""
                        } block px-5 py-3`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/dashboard"
                        className={`${
                            pathname === "/dashboard" ? "bg-gray-700" : ""
                        } block px-5 py-3`}
                    >
                        Dashboard
                    </Link>
                </li>
            </ul>
            <Button>
                <Link href="/login">Đăng nhập</Link>
            </Button>
        </div>
    );
}
