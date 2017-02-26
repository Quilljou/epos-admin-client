import React from 'react';
import styles from './layout.css';
import Menu from './Menu'
import logo from '../../assets/yay.jpg'

function Sider() {
    return (
        <div>
            <div className={styles['logo-wrap']}>
                <img src={logo} alt="" className={styles.logo}/>
            </div>
            <Menu></Menu>
        </div>
    )
}

export default Sider;
