import React from 'react';
import { Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


// function UserModal({userModalVisible,onCreate, hideUserModal}) {
//     const formItemLayout = {
//       labelCol: { span: 6 },
//       wrapperCol: { span: 14 }
//     };
//
//     // const validatePeriod = ['一年','两年','三年']
//
//     return (
//         <Modal title="创建商家"
//             visible={userModalVisible}
//             onOk = {onCreate}
//             onCancel = {hideUserModal}>
//             <Form>
//                 <FormItem label="有效期"
//                     {...formItemLayout}>
//                     {getFieldDecorator('title',{
//                         initialValue: '1',
//                         rules: [{
//                             required: true,
//                             message: '不能为空'
//                         }]
//                     })(
//                         <Select>
//                             <Option value="1">一年</Option>
//                             <Option value="2">两年</Option>
//                             <Option value="3">三年</Option>
//                         </Select>
//                     )}
//                 </FormItem>
//             </Form>
//         </Modal>
//     )
// }

const UserModal = Form.create()(
    (props)  => {
        const formItemLayout = {
              labelCol: { span: 6 },
              wrapperCol: { span: 14 }
            };

        const {userModalVisible,onCreate, hideUserModal, form} = props;
        const { getFieldDecorator, validateFields, getFieldsValue } = form;

        function handleOk() {
            // todo 表单验证
            onCreate(getFieldsValue());
        }


        return (
            <Modal title="创建商家"
                visible={userModalVisible}
                onOk = {handleOk}
                onCancel = {hideUserModal}>
                <Form>
                    <FormItem label="有效期"
                        {...formItemLayout}>
                        {getFieldDecorator('validatePeriod',{
                            initialValue: '1',
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Select>
                                <Option value="1">一年</Option>
                                <Option value="2">两年</Option>
                                <Option value="3">三年</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)


export default UserModal;
