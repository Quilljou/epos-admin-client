import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const FormItem = Form.Item;


const UserModal = Form.create()(
    (props)  => {
        const formItemLayout = {
              labelCol: { span: 6 },
              wrapperCol: { span: 14 }
            };

        const {pwdModalVisible,onUpdatePassword, hidePwdModal, form} = props;
        const { getFieldDecorator, validateFields, getFieldsValue, validateFieldsAndScroll } = form;

        function handleOk() {
            // todo 表单验证
            validateFieldsAndScroll( (errors,values) => {
                if(errors) {
                    return;
                }
                onUpdatePassword(values);
            })
        }


        return (
            <Modal title="修改密码"
                visible={pwdModalVisible}
                onOk = {handleOk}
                onCancel = {hidePwdModal}>
                <Form>
                    <FormItem label="新密码"
                        {...formItemLayout}
                        hasFeedback>
                        {getFieldDecorator('newPasd',{
                            rules: [{
                                required: true,
                                len: 6,
                                message: '不能为空且为六位数字'
                            }]
                        })(
                            <Input placeholder="六位数字"/>
                        )}
                    </FormItem>
                    <FormItem label="确认密码"
                        {...formItemLayout}
                        hasFeedback>
                        {getFieldDecorator('newPasd_confirmation',{
                            rules: [{
                                required: true,
                                len: 6,
                                message: '不能为空且为六位数字'
                            }]
                        })(
                            <Input placeholder="重复确认密码"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)


export default UserModal;
