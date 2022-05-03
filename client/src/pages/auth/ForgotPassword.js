import { useState } from "react";
import useInput from "../../hooks/useInput";

import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const {
    value: email,
    resetValue: resetEmail,
    bind: bindEmail,
  } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        resetEmail();
        toast.success("Check your Email for password reset link");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setLoading(false);
      });
  };

  const forgotPasswordForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          {...bindEmail}
          autoFocus
          required
          className="form-control"
          placeholder="Email"
        />
      </div>
      <button type="submit" className="btn btn-raised">
        Submit
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Forgot Password</h4>
          )}

          {forgotPasswordForm()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
