import React from 'react';
// import styles from './Nav.css';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import { menus } from '../../utils/menu'

const SubMenu = Menu.SubMenu;

const renderItem = (item) => {
  if(item.subMenu) {
    return (
      <SubMenu key={item.title} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
      {
        item.children.map((child) => {
          return renderItem(child)
        })
      }
      </SubMenu>
    )
  }else {
    return (
      <Menu.Item key={item.path}>
          <Link to={item.path}>
              <Icon type={item.icon}></Icon>
              {item.title}
          </Link>
      </Menu.Item>
    )
  }
}

// location 是 props
function Menus() {
  return (
        <Menu
            theme='dark'
            mode="inline"
            >
            {
              menus.map((menu) => renderItem(menu))
            }
            {/* <Menu.Item key="tenant">
                <Link to="/tenant">
                    <Icon type="user"></Icon>
                    商户管理
                </Link>
            </Menu.Item>
            <Menu.Item key="version">
                <Link to="/android">
                    <Icon type="upload"></Icon>
                    版本管理
                </Link>
            </Menu.Item>
             <SubMenu key="sub1" title={<span><Icon type="upload" /><span>版本管理</span></span>}>
                <Menu.Item key="android">
                    <Link to="/android">
                        安卓客户端
                    </Link>
                </Menu.Item>
              </SubMenu> */}
        </Menu>
  );
}

export default Menus;
