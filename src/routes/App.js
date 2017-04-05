import React from 'react';
import menus from '../config/menus';
import { connect } from 'dva'
import styles from './main.css';
import Sider from '../components/Layout/Sider'
import Header from '../components/Layout/Header'
import Bread from '../components/Layout/Bread';
import Login from './Login';


function App({ dispatch, children, app, location }) {
    const { login,loginButtonLoading, onOk, user, changeNavStatus,siderOpen } = app;
    const siderProps = {
      location
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
        changeNavStatus () {
            dispatch ({
                type: 'app/changeNavStatus'
            })
        }
    }


    return (
        <div>{
            <div>
                <aside
                    style={{
                        left: siderOpen ? '0' : '-200px'
                    }}
                    className={styles.sider}>
                    <Sider {...siderProps}/>
                </aside>
                <main className={styles.main}
                    style={{
                        marginLeft: siderOpen ? '200px' : '0'
                    }}>
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
