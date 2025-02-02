"use client"

import Image from "next/image";
import {RefObject, useContext, useEffect, useRef, useState} from "react";
import {createUser, getUser, validateRegistrationForm} from "@/services/userService";
import User from "@/interfaces/user";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useUser} from "@/contexts/userContext";

export default function HomePage() {
    const formRef: RefObject<HTMLFormElement | null> = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<Error[] | null>(null);
    const router = useRouter();
    const { auth } = useUser();
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors(null); //Clear current errors 

        if (formRef.current) {
            const formData = new FormData(formRef.current);

            //Check form data is valid and return any errors
            const formErrors: Error[] | null = validateRegistrationForm(formData);
            if (formErrors) {
                setErrors(formErrors);
                return;
            }
            
            try {
                //Attempt to create the user if validation passes
                await createUser(formData);
                
                //Set the user in state
                const newUser : User | null = await getUser();
                if(newUser) {
                    auth.setUser(newUser );
                    router.push("/");
                }
            } catch (error) {
                if (error instanceof Error) {
                    setErrors([{name: "UserRegistrationError", message: error.message}]);
                }
            }
        }
    }
    return (
        <div className="container m-auto">
            <div className="flex h-screen">
                <div className="m-auto 2xl:w-1/4 max-w-96">
                <form
                    className="border border-gray-300 p-6 rounded-2xl m-auto"
                    onSubmit={handleFormSubmit}
                    ref={formRef}
                >
                    <div className="pb-3">
                        <h1 className="text-2xl ">Create an account</h1>
                        <p className="text-gray-600">Please enter your details</p>
                    </div>
                    <div>
                        {errors ? (
                            errors.map(e => (
                                <p className="text-red-500" key={e.name}> {e.message}</p>
                            ))
                        ) : null}
                    </div>
                    <div className="py-1">
                        <label htmlFor="forename">First name</label>
                        <input className="w-full bg-gray-100" type="text" name="forename"/>
                    </div>
                    <div className="py-1">
                        <label htmlFor="surname">Surname</label>
                        <input className="w-full bg-gray-100" type="text" name="surname"/>
                    </div>
                    <div className="py-1">
                        <label htmlFor="email">Email</label>
                        <input className="w-full bg-gray-100" type="email" name="email"/>
                    </div>
                    <div className="py-1">
                        <label htmlFor="password">Password</label>
                        <input className="w-full bg-gray-100" type="password" name="password"/>
                    </div>
                    <div className="py-1">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input className="w-full bg-gray-100" type="password" name="confirmPassword"/>
                    </div>
                    <div className="flex justify-center pt-4">
                        <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold p-2 w-full">
                            Register
                        </button>
                    </div>
                    <div className="py-3 text-center">
                        <p>Already have an account?</p>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/login" className="w-full">
                            <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold p-2 w-full">
                                Login
                            </button>
                        </Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}
