import { useState } from "react";
import "./SignUpPage.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash, faImage, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import ImgAvatar from "/src/assets/img_avatar.png";
import { DevTool } from "@hookform/devtools";
import { SignUPInputsTypes } from "../../types/AuthInputs.type";
import { useCreateUserWithEmailAndPassword } from "../../hooks/auth/authMutations";
export default function SignUpPage() {
    const { mutateAsync } = useCreateUserWithEmailAndPassword();
    //From Hook
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
    } = useForm<SignUPInputsTypes>({ mode: "onChange" });

    //showPassword State
    const [showPasswrod, setShowPasswrod] = useState<boolean>(false);
    //Submit Function
    const submitFrom = (data: SignUPInputsTypes) => {
        mutateAsync(data);
    };

    //Image Preview Condition
    const image = watch("image")?.length >= 1 ? watch("image")[0] : null;
    const imageSrc = image ? URL.createObjectURL(image) : null;

    return (
        <main className="signup-page-container">
            <fieldset>
                <legend>SignUp</legend>
                <form onSubmit={handleSubmit(submitFrom)}>
                    {/* USERNAME INPUT */}
                    <span className="input-span">
                        <input
                            type="text"
                            autoComplete="none"
                            placeholder="Username"
                            {...register("username", {
                                required: "Username is Required",
                            })}
                        />{" "}
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span className="erros-span">{errors.email?.message}</span>

                    {/* EMAIL INPUT */}
                    <span className="input-span">
                        <input
                            type="email"
                            autoComplete="none"
                            placeholder="user@example.com"
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
                                minLength: { value: 8, message: "Passwrod should be more than 8 characters." },
                                required: "Password is Required",
                            })}
                        />{" "}
                        <button className="show-hide-pass-icon" type="button" onClick={() => setShowPasswrod(!showPasswrod)}>
                            {!showPasswrod ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <span className="erros-span">{errors.password?.message}</span>

                    {/* PASSWORD CONFIRM INPUT */}
                    <span className="input-span">
                        <input
                            type={showPasswrod ? "text" : "password"}
                            placeholder="Confirm Password"
                            autoComplete="none"
                            {...register("passwordConfrim", {
                                validate: {
                                    value: (value, fromValue) => (value !== fromValue.password ? "Password not match" : true),
                                },
                            })}
                        />{" "}
                        <button className="show-hide-pass-icon" type="button" onClick={() => setShowPasswrod(!showPasswrod)}>
                            {!showPasswrod ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <span className="erros-span">{errors.passwordConfrim?.message}</span>

                    {/* IMAGE INPUT */}
                    <label> Chose Image</label>
                    <span className="input-chosefile">
                        <img src={imageSrc || ImgAvatar} className="avatar-40" alt="" />
                        <input type="file" accept="image/*" autoComplete="none" {...register("image", {})} /> <FontAwesomeIcon icon={faImage} />
                    </span>
                    <button className="btn-primary" type="submit">
                        Create An Account
                    </button>
                    {/* HR <OR> */}
                    <div className="hr-container">
                        <hr />
                    </div>

                    {/* GOOGLE LOGIN  */}
                    <button className="btn-primary-outline google-login">
                        {" "}
                        SignUp with Google <GoogleIcon />
                    </button>
                </form>
                <DevTool control={control} /> {/* set up the dev tool */}
                <span>
                    already have an account?{" "}
                    <Link to={"/login"}>
                        <b>Login here</b>
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
