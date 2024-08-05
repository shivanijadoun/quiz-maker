'use client'
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            // Redirect to dashboard or profile page after successful login
            router.push("/create");
        } catch (error) {
            console.error("Login failed", error.message);
            toast.error("Failed to login. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Enable/disable button based on form validity
        setButtonDisabled(!(user.email && user.password));
    }, [user.email, user.password]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                disabled={buttonDisabled || loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
            <Link href="/signup">
                <aj className="text-blue-500">Visit Signup page</aj>
            </Link>
        </div>
    );
}
