import React from 'react';
import styles from './layout.css';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

// location 是 props
function Header({location, changeNavStatus}) {
  return (
    <div>
      <div className={styles['nav-btn']} onClick={changeNavStatus}>
        <Icon type="menu-fold"></Icon>
      </div>
      <Menu
          mode="horizontal">
          <SubMenu title={<span><Icon type="user"/> guest</span>} className="fr">
              <MenuItem>
                <Icon type="logout"/>登出
              </MenuItem>
          </SubMenu>
      </Menu>
    </div>
  );


}


export default Header;
