import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

import { LOGOUT } from "../../store/types/user.type";

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

  const { Item, SubMenu } = Menu;

  const handleCurrent = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    signOut(auth);
    dispatch({
      type: LOGOUT,
      payload: null,
    });
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
      <SubMenu key="SubMenu" title="Username" icon={<SettingOutlined />}>
        <Item key="two" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>

        <Item key="three" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>

        <Item key="logout" icon={<LoginOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>

      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
      </Item>

      <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Item>
    </Menu>
  );
};

export default Header;
