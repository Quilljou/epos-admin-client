import React from 'react';
// import styles from './Nav.css';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

const SubMenu = Menu.SubMenu;

// location 是 props
function Menus() {
  return (
        <Menu
            theme='dark'
            mode="inline"
            >
            {/* <Menu.Item key="index">
                <Link to="/">
                    <Icon type="pie-chart"></Icon>
                    首页
                </Link>
            </Menu.Item> */}

            <Menu.Item key="user">
                <Link to="/tenant">
                    <Icon type="user"></Icon>
                    商户管理
                </Link>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="upload" /><span>版本管理</span></span>}>
                <Menu.Item>
                    <Link to="/android">
                        安卓客户端
                    </Link>
                </Menu.Item>
              </SubMenu>
        </Menu>
  );
}

export default Menus;
