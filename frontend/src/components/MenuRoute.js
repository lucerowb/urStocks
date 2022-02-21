import { Menu } from "antd";
import { Link } from "react-router-dom";

import {
  UploadOutlined,
  UserOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";

function MenuRoute() {
  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UploadOutlined />}>
        <Link to="/portfolio">Portfolio</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<CopyrightOutlined />}>
        <Link to="/company">Company</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuRoute;
