import React from 'react';
import styles from './layout.css';
import logo from '../../assets/yay.jpg'
import { Link } from 'dva/router';
import { Menu, Icon } from 'antd';
import { menus } from '../../utils/menu'

const SubMenu = Menu.SubMenu;

function Sider({location}) {
    return (
        <div>
            <div className={styles['logo-wrap']}>
                <img src={logo} alt="" className={styles.logo}/>
            </div>
            <Menus location={location}></Menus>
        </div>
    )
}





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
function Menus({location}) {
  return (
        <Menu
            theme='dark'
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            >
            {
              menus.map((menu) => renderItem(menu))
            }
        </Menu>
  );
}

export default Sider;
