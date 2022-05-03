import useInput from "../../hooks/useInput";

import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

import { toast } from "react-toastify";

const Register = () => {
  const {
    value: email,
    resetValue: resetEmail,
    bind: bindEmail,
  } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, config);
    toast.success(
      `Email is sent to email ${email}. Click the link to complete your registration.`
    );
    window.localStorage.setItem("emailForRegistration", email);
    resetEmail();
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        {...bindEmail}
        autoFocus
        required
        className="form-control"
      />
      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>

          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
