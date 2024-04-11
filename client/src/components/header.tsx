import React from "react";
import { ToggleBtn } from "./toggle-btn";
import Link from "next/link";

export default function Header() {
    return (
        <div className="p-5 bg-[#1c1c36] mb-10">
            <ul className="flex gap-5 items-center">
                <li>
                    <ToggleBtn />
                </li>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/login">Đăng nhập</Link>
                </li>
                <li>
                    <Link href="/register">Đăng ký</Link>
                </li>
            </ul>
        </div>
    );
}
