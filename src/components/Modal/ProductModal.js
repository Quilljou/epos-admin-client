import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const FormItem = Form.Item;


const ProductModal = Form.create()(
    (props)  => {
        const formItemLayout = {
              labelCol: { span: 6 },
              wrapperCol: { span: 14 }
            };

        const {productModalVisible, onhideProductModal, form, onAddProduct} = props;
        const { getFieldDecorator, validateFields, getFieldsValue, validateFieldsAndScroll } = form;

        function handleOk() {
            // todo 表单验证
            validateFieldsAndScroll( (errors,values) => {
                if(errors) {
                    return;
                }
                onAddProduct(values);
            })
        }


        return (
            <Modal title="新增产品"
                visible={productModalVisible}
                onOk = {handleOk}
                onCancel = {onhideProductModal}>
                <Form>
                    <FormItem label="客户端名称"
                        {...formItemLayout}
                        hasFeedback>
                        {getFieldDecorator('name',{
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="客户端名字"/>
                        )}
                    </FormItem>
                    <FormItem label="产品ID"
                        {...formItemLayout}
                        hasFeedback>
                        {getFieldDecorator('productID',{
                            rules: [{
                                required: true,
                                message: '不能为空'
                            }]
                        })(
                            <Input placeholder="产品ID"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
)


export default  ProductModal;
