import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";

import { toast } from "react-toastify";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!password || !email) {
        toast.error("Email and Password is required");
        return;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");

        const user = await auth.currentUser;
        // await user.updatePassword(password);

        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();

        navigate("/");
        console.log("idToken", idTokenResult, "User", user);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" disabled value={email} className="form-control" />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Password"
        className="form-control"
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
