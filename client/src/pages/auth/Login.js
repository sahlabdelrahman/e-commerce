import { useState } from "react";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../store/actions/user.action";

import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { value: email, bind: bindEmail } = useInput("");

  const { value: password, bind: bindPassword } = useInput("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch(
        login({
          email: user.email,
          token: idTokenResult.token,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();

        dispatch(
          login({
            email: user.email,
            token: idTokenResult.token,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          {...bindEmail}
          autoFocus
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          {...bindPassword}
          required
          className="form-control"
        />
      </div>
      <Button
        type="primary"
        className="mb-3"
        block
        shape="round"
        size="large"
        icon={<MailOutlined />}
        disabled={!email || password.length < 6}
        onClick={handleSubmit}
      >
        Login with Email / Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}

          {loginForm()}
          <Button
            type="danger"
            className="mb-3"
            block
            shape="round"
            size="large"
            icon={<GoogleOutlined />}
            onClick={handleLoginWithGoogle}
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
