import React from 'react';
import menus from '../config/menus';
import { connect } from 'dva'
import styles from './main.css';
import Sider from '../components/Layout/Sider'
import Header from '../components/Layout/Header'
import Bread from '../components/Layout/Bread';
import Login from './Login';


function App({ dispatch, children, app }) {
    const { login,loginButtonLoading, onOk, user } = app;
    const siderProps = {
        // menus: menus.data
    }

    const HeaderProps = {
        onLogout ({item, key, keyPath}) {
            // 参数是一个Object,需要使用析构解析出
            switch (key) {
                case 'logout':
                    dispatch ({
                        type: 'login/logout'
                    })
                    break;
                default:
                    return;
            }
        },
        user,
        // changeNavStatus (status) {
        //     dispatch () {
        //
        //     }
        // }
    }


    return (
        <div>{
            <div>
                <aside className={styles.sider}>
                    <Sider />
                </aside>
                <main className={styles.main}>
                    <Header {...HeaderProps}/>
                    {/* <Bread /> */}
                    <div className={styles.container}>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        }
        </div>
    )
}


export default connect(({app}) => ({app}))(App)
