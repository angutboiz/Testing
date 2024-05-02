import React from "react";
import LoginForm from "./login-form";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className="w-[500px]">
                <h1 className="mb-5">Login</h1>
                <LoginForm />
                <div className="flex gap-2 mt-4">
                    <p>Don't have an account?</p>
                    <Link className="text-blue-500" href="/register">
                        Register now
                    </Link>
                </div>
            </div>
        </div>
    );
}
