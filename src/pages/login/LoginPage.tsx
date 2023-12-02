import { useState } from "react";
import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { SignInTypes } from "../../types/AuthInputs.type";
import { useSignInWithEmailAndPassword } from "../../hooks/auth/authMutations";
import { useAuthContext } from "../../contexts/AuthContext";
import { FBaseAuthCall } from "../../api/FBaseAuthCalls";

export default function LoginPage() {
    const { mutateAsync } = useSignInWithEmailAndPassword();
    const { setIsAuth } = useAuthContext();
    const navigate = useNavigate()
    //From Hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInTypes>({ mode: "onChange" });

    //shotPassword State
    const [showPasswrod, setShowPasswrod] = useState<boolean>(false);

    //Submit Function
    const submitFrom = (data: SignInTypes) => {
        mutateAsync(data, {
            onSuccess: () => setIsAuth(true),
        });
    };
    return (
        <main className="login-page-container">
            <fieldset>
                <legend>Login</legend>
                <form onSubmit={handleSubmit(submitFrom)}>
                    {/* EMAIL INPUT */}
                    <span className="input-span">
                        <input
                            type="email"
                            autoComplete="none"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is Required",
                            })}
                        />{" "}
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <span className="erros-span">{errors.email?.message}</span>

                    {/* PASSWORD INPUT */}
                    <span className="input-span">
                        <input
                            type={showPasswrod ? "text" : "password"}
                            placeholder="Password"
                            autoComplete="none"
                            {...register("password", {
                                required: "Password is Required",
                            })}
                        />{" "}
                        <button className="show-hide-pass-icon" type="button" onClick={() => setShowPasswrod(!showPasswrod)}>
                            {!showPasswrod ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <span className="erros-span">{errors.password?.message}</span>
                    <span>
                        <Link to={"/reset-password"}>
                            <b>Forgot Password?</b>
                        </Link>
                    </span>
                    <button className="btn-primary" type="submit">
                        Login
                    </button>
                    {/* HR <OR> */}
                    <div className="hr-container">
                        <hr />
                    </div>

                    {/* GOOGLE LOGIN  */}
                    <button onClick={()=> FBaseAuthCall.signInWithGoogle().then(()=>{
                        setIsAuth(true)
                        navigate('/')
                    })} type="button" className="btn-primary-outline google-login">
                        {" "}
                        Continue with Google <GoogleIcon />
                    </button>
                </form>
                <span>
                    dont have an account?{" "}
                    <Link to={"/signup"}>
                        <b>Register here</b>
                    </Link>
                </span>
            </fieldset>
        </main>
    );
}

function GoogleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
            <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
        </svg>
    );
}
