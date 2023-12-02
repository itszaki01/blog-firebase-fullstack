import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { useResetPasswrod } from "../../hooks/auth/authMutations";

export default function ResetPasswordPage() {
  const [email,setEmail] = useState<string>('')
  const {mutateAsync} = useResetPasswrod()

  function handleFormSubmit(e:React.MouseEvent<HTMLFormElement>){
    e.preventDefault()
    mutateAsync(email)
  }
    return (
        <main className="login-page-container">
            <fieldset>
                <legend>Reset Password</legend>
                <form onSubmit={handleFormSubmit}>
                    {/* EMAIL INPUT */}
                    <span className="input-span">
                        <input type="text" autoComplete="none" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Your Email" /> <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <img src="" alt="" />

                    <button className="btn-primary" type="submit">
                        Send Email
                    </button>
                </form>
            </fieldset>
        </main>
    );
}
