import { useMutation } from "@tanstack/react-query";
import { SignInTypes, SignUPInputsTypes } from "../../types/AuthInputs.type";

import { useNavigate } from "react-router-dom";
import { FBaseAuthCall } from "../../api/FBaseAuthCalls";
import { Toast } from "../../Swal/Mixins";

//Sign Up
export function useCreateUserWithEmailAndPassword() {
    const navigate = useNavigate();
    
    return useMutation({
        mutationFn: (userData: SignUPInputsTypes) => FBaseAuthCall.signUpUser(userData),
        onSuccess: () => {
            Toast.fire({
                title: "Account Created",
                icon: "success",
            });
            navigate("/login");
        },
        onError: (error) => {
            Toast.fire({
                title: error.message,
                icon: "error",
            });
        },
    });
}

//Sign IN
export function useSignInWithEmailAndPassword() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (userData: SignInTypes) => FBaseAuthCall.signInUser(userData),
        onSuccess: () => {
            Toast.fire({
                title: "Login Sucessfuly",
                icon: "success",
            });
            navigate("/");
        },
        onError: (error) => {
            Toast.fire({
                title: error.message,
                icon: "error",
            });
        },
    });
}


// Send Reset Email

export function useResetPasswrod(){
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (userEmail:string) => FBaseAuthCall.resetPasswordEmail(userEmail),
        onSuccess: () => {
            Toast.fire({
                title: "Email Sent Successfuly",
                icon: "success",
            });
            navigate("/login");
        },
        onError: (error) => {
            Toast.fire({
                title: error.message,
                icon: "error",
            });
        },
    });
}

