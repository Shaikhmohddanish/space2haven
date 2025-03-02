"use client";

import axios from "axios";
import Input from "../Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { EyeOff, Eye } from "lucide-react";

const FormTabs = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    
    const [signinInputs, setSigninInputs] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSigninInputs(prev => ({
            ...prev, [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axios.post(`/api/auth/admin/signin`, signinInputs, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            toast({ description: "Login successful! Redirecting to Dashboard..." });

            localStorage.setItem("adminDetails", JSON.stringify(response?.data));
            router.push("/admin/dashboard");
            
        } catch (error: any) {
            console.error("Error:", error);
            const errorMessage = error?.response?.data?.error || "Invalid credentials";
            toast({ description: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-center text-home uppercase">
                Admin Login
            </h1>
            <Card className="w-[400px] mx-auto mt-6">
                <CardHeader className="text-center">
                    <CardDescription>Sign in with your admin credentials</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="text-sm">
                    <CardContent className="py-3 space-y-2">
                        <Input
                            title="Email ID"
                            name="email"
                            value={signinInputs.email}
                            placeholder="Enter your Email ID"
                            type="email"
                            onChange={handleInputChange}
                        />
                        <div className="flex w-full relative">
                            <Input
                                title="Password"
                                name="password"
                                value={signinInputs.password}
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                onChange={handleInputChange}
                            />
                            <span
                                className="absolute right-4 top-8 bottom-5 h-fit"
                                onClick={() => setShowPassword(!showPassword)}
                                role="button"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <button type="submit" className="btn-class w-full flex justify-center" disabled={loading}>
                            {loading ? <div className="w-6 h-6 loader-common-styles" /> : "Sign In"}
                        </button>
                    </CardFooter>
                </form>
            </Card>
        </>
    );
};

export default FormTabs;
