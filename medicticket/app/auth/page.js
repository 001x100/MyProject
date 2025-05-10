"use client";
import React, { useCallback, useState } from "react";
import GenderInput from "@/components/genderInput";
import Input from "@/components/input";
import BirthdayInput from "@/components/birthdayinput";
import FileInput from "@/components/fileinput";
import { useRouter } from 'next/navigation'; 
import Navbar from "@/components/navbar";

export default function Auth() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');
    
    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => (currentVariant === 'login' ? 'register' : 'login'));
    }, []);

    const handleLogin = () => {
        console.log('Logging in with', { email, password });
        router.push('/'); 
    };

    const handleSignUp = () => {
        console.log('Signing up with', { email, name, password });
        router.push('/auth');
        setTimeout(() => window.location.reload(), 500); // รอสักพักก่อน reload
    };

    return (
        <div>
            <Navbar /> {/* แสดง Navbar ด้านบน */}
            <div className="min-h-screen custom-gradient flex items-center justify-center pt-20"> {/* เพิ่ม pt-20 */}
                <div className="bg-white px-16 py-20 rounded-3xl shadow-md w-full max-w-lg">
                    <div className="text-loginblue text-4xl font-semibold mb-10 text-center">
                        {variant === 'login' ? 'LOG IN' : 'SIGN UP'}
                    </div>
                    <div className="flex flex-col gap-y-10">
                        {variant === 'register' && (
                            <>
                                <Input id="firstname" label="FIRSTNAME" placeholder="Enter your Firstname" type="text" />
                                <Input id="lastname" label="LASTNAME" placeholder="Enter your Lastname" type="text" />
                            </>
                        )}
                        <Input id="email" label="EMAIL" placeholder="Enter your email" type="email" />
                        {variant === 'register' && (
                            <Input id="phonenumber" label="MOBILE PHONE NUMBER" placeholder="Enter your Phone Number" type="text" />
                        )}
                        <Input id="password" label="PASSWORD" placeholder="Enter your password" type="password" />
                        {variant === 'register' && (
                            <>
                                <Input id="passwordConfirm" label="PASSWORD CONFIRMATION" placeholder="Confirm your password" type="password" />
                                <BirthdayInput id="birthday" label="BIRTHDAY" />
                                <GenderInput id="gender" label="GENDER" />
                                <FileInput id="file" label="MEDICAL CERTIFICATE" />
                            </>
                        )}
                    </div>
                    <button
                        onClick={variant === 'login' ? handleLogin : handleSignUp}
                        className="bg-cyan-600 py-3 text-white rounded-md w-full mt-10 hover:bg-green-700 transition"
                    >
                        {variant === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                    <p className="text-neutral-500 mt-12 text-center">
                        {variant === 'login' ? "Don't have an account?" : 'Already have an account?'}
                        <span onClick={toggleVariant} className="text-loginblue ml-1 hover:underline cursor-pointer">
                            {variant === 'login' ? 'SIGN UP' : 'LOG IN'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
