"use client"

import {useEffect, useRef, useState} from "react";
import {fetchPasswordToken, userResetPassword, validatePasswordResetForm} from "@/services/userService";
import {useSearchParams} from "next/navigation";
import PasswordResetToken from "@/interfaces/PasswordResetToken";
import Link from "next/link";

export default function ResetPasswordPage() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errors, setErrors] = useState<Error[] | null>(null);
    const searchParams = useSearchParams();
    const [isValidToken, setIsValidToken] = useState<boolean>(false);
    const [passwordResetToken, setPasswordResetToken] = useState<PasswordResetToken | null>(null);
    const [passwordReset, setPasswordReset] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getPasswordResetToken = async () => {
            
            //Get password reset token from search params
            const tokenId: string | null = searchParams.get("token"); //Get password reset token

            //Check if search params contain a valid token
            if (!tokenId) {
                setLoading(false);
                return;
            }
            
            //Fetch token, as well as check if it has not expired/is valid
            const token: PasswordResetToken = await fetchPasswordToken(tokenId);
            if (!token) {
                setLoading(false);
                return;
            }
            setIsValidToken(true);
            setPasswordResetToken(token);
            setLoading(false);
        }
        getPasswordResetToken();
    }, [searchParams]);
    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrors(null); //Clear errors

        if (formRef.current) {
            const formData = new FormData(formRef.current);

            //Check form data is valid and return any errors
            const formErrors: Error[] | null = validatePasswordResetForm(formData);
            if (formErrors) {
                setErrors(formErrors);
                return;
            }

            //Update the users password
            try {
                if (passwordResetToken) {
                    await userResetPassword(passwordResetToken?.tokenId, formData);
                    setPasswordReset(true);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setErrors([{name: "PasswordResetError", message: error.message}]);
                }
            }
        }
    }
    
    //Don't return form if page is loading
    if(loading) return null;

    return (
        <div className="container m-auto">
            <div className="flex h-screen">
                <div className="m-auto 2xl:w-1/4 max-w-96">
                    {isValidToken ? (
                    <form
                        className="border border-gray-300 p-6 rounded-2xl m-auto"
                        onSubmit={handleFormSubmit}
                        ref={formRef}
                    >
                        <div className="pb-3">
                            <h1 className="text-2xl ">Reset password</h1>
                            <p className="text-gray-600">Please enter your new password</p>
                        </div>
                        <div>
                            {errors ? (
                                errors.map(e => (
                                    <p className="text-red-500" key={e.name}> {e.message}</p>
                                ))
                            ) : null}
                        </div>
                        <div>
                        </div>
                        <div>
                            {!passwordReset ? (
                                <div>
                                    <div className="py-1">
                                        <label htmlFor="Password">Password</label>
                                        <input className="w-full bg-gray-100" type="password" name="password"/>
                                    </div>
                                    <div className="py-1">
                                        <label htmlFor="ConfirmPassword">Confirm password</label>
                                        <input className="w-full bg-gray-100" type="password" name="confirmPassword"/>
                                    </div>
                                    <div className="flex justify-center pt-4">
                                        <button type="submit"
                                                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold p-2 w-full">
                                            Change password
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>Your password has been reset</p>
                                    <Link href="/login">
                                        <button 
                                            type="submit" 
                                            className="mt-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold p-2 w-full"
                                        >
                                            Return to login
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </form>
                    ) : (
                        <div>
                            <p className="">
                                Password reset token does not exist or has expired
                            </p>
                            <Link href="/login">
                                <button
                                    type="submit"
                                    className="mt-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold p-2 w-full"
                                >
                                    Return to login
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}