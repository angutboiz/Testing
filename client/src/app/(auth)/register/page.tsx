import React from "react";
import RegisterForm from "./register-form";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center h-[80vh] mt-10">
            <div className="w-[500px]">
                <h1 className="mb-5">Register</h1>
                <RegisterForm />

                <div className="flex gap-2 mt-4">
                    <p>You have an account?</p>
                    <Link className="text-blue-500" href="/login">
                        Login now
                    </Link>
                </div>
            </div>
        </div>
    );
}
