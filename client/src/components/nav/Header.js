import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import { logout } from "../../store/actions/user.action";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const Header = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const { Item, SubMenu } = Menu;

  const handleCurrent = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    signOut(auth);
    dispatch(logout(null));
    navigate("/login");
  };

  return (
    <Menu
      onClick={handleCurrent}
      mode="horizontal"
      defaultSelectedKeys={[current]}
    >
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {user && (
        <SubMenu
          className="float-right"
          key="SubMenu"
          title={user.email && user.email.split("@")[0]}
          icon={<SettingOutlined />}
        >
          <Item key="two" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Item>

          <Item key="three" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>

          <Item key="logout" icon={<LoginOutlined />} onClick={handleLogout}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!user && (
        <>
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/register">Register</Link>
          </Item>

          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        </>
      )}
    </Menu>
  );
};

export default Header;
