import { useState } from "react";
import { Link } from "react-router-dom";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const Header = () => {
  const [current, setCurrent] = useState("");

  const { Item, SubMenu } = Menu;

  const handleCurrent = (e) => {
    setCurrent(e.key);
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
