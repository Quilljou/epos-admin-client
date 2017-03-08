import React, {PropTypes} from 'react'
import { Button, Row, Form, Input } from 'antd'
import { connect } from 'dva';
import styles from './main.css';
import Helmet from "react-helmet";


const FormItem = Form.Item
//
// const Login = Form.create()(
//   ({
//     loginButtonLoading,
//     onOk,
//     form: {
//       getFieldDecorator,
//       validateFieldsAndScroll
//     }
//   }) => {
//     function onOk () {
//       validateFieldsAndScroll((errors, values) => {
//         if (errors) {
//           return
//         }
//         onOk(values)
//       })
//     }
//
//     return (
//       <div className={styles.form}>
//         <div className={styles.logo}>
//           <span>EPOS商户后台</span>
//         </div>
//         <form>
//           <FormItem hasFeedback>
//             {getFieldDecorator('userID', {
//               rules: [
//                 {
//                   required: true,
//                   message: '请填写用户名'
//                 }
//               ]
//             })(<Input size='large' onPressEnter={onOk} placeholder='用户名' />)}
//           </FormItem>
//           <FormItem hasFeedback>
//             {getFieldDecorator('password', {
//               rules: [
//                 {
//                   required: true,
//                   message: '请填写密码'
//                 }
//               ]
//             })(<Input size='large' type='password' onPressEnter={onOk} placeholder='密码' />)}
//           </FormItem>
//           <Row>
//             <Button type='primary' size='large' onClick={onOk} loading={loginButtonLoading}>
//               登录
//             </Button>
//           </Row>
//         </form>
//       </div>
//     )
//   }
// );


function Login(props) {
    const {
        loginButtonLoading,
        form: {
          getFieldDecorator,
          validateFieldsAndScroll
          },
        dispatch
    } = props;

    function onOk () {
          validateFieldsAndScroll((errors, values) => {
            if (errors) {
              return
            }
        dispatch ({
            type: 'login/login',
            payload: values
        })

          })
    }


    return  (
        <div className={styles.form}>
            <Helmet title="登录" />
            <div className={styles.logo}>
              <span>EPOS商户后台</span>
            </div>
            <form>
              <FormItem hasFeedback>
                {getFieldDecorator('userID', {
                  rules: [
                    {
                      required: true,
                      message: '请填写用户名'
                    }
                  ]
                })(<Input size='large' onPressEnter={onOk} placeholder='用户名' />)}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请填写密码'
                    }
                  ]
                })(<Input size='large' type='password' onPressEnter={onOk} placeholder='密码' />)}
              </FormItem>
              <Row>
                <Button type='primary' size='large' onClick={onOk} loading={loginButtonLoading}>
                  登录
                </Button>
              </Row>
            </form>
          </div>
        )
  }

Login = Form.create()(Login)


function mapStateToProps({login}) {
    return {login};
}

export default connect(mapStateToProps)(Login);
