import React from 'react';
import menus from '../config/menus';
import { connect } from 'dva'
import styles from './main.css';
import Sider from '../components/Layout/Sider'
import Header from '../components/Layout/Header'
import Bread from '../components/Layout/Bread';


function App({ children, app }) {
    const siderProps = {
        // menus: menus.data
    }

    const HeaderProps = {

    }

    return (
        <div>
            <aside className={styles.sider}>
                <Sider />
            </aside>
            <main className={styles.main}>
                <Header />
                <Bread />
                <div className={styles.container}>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}


export default connect(({app}) => ({app}))(App)
