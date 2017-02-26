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
        const { getFieldDecorator, validateFields, getFieldsValue } = form;

        function handleOk() {
            // todo 表单验证
            onUpdatePassword(getFieldsValue());
        }


        return (
            <Modal title="修改密码"
                visible={pwdModalVisible}
                onOk = {handleOk}
                onCancel = {hidePwdModal}>
                <Form>
                    <FormItem label="新密码"
                        {...formItemLayout}>
                        {getFieldDecorator('newPasd',{
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem label="确认密码"
                        {...formItemLayout}>
                        {getFieldDecorator('newPasd_confirmation',{
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)


export default UserModal;
