import React from 'react';
import { Modal, Form, Select, Input, Switch, Upload, Button, Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;




    const VersionModal = Form.create()(
            (props) => {
                var formData = new FormData()
                const {VersionModalVisible,onAdd, uploadLoading,onHideVersionModal, form} = props;
                const { getFieldDecorator, validateFields, getFieldsValue } = form;


                function handleOk() {
                    const values = getFieldsValue();

                    Object.keys(values).forEach((key) => {
                        if(values[key]) {
                            formData.append(key,values[key]);
                        }
                    })
                    const fileNode = document.getElementById('file');
                    const file = fileNode.files[0];
                    formData.append('apk',file,file.name)
                    formData.append('productID','1')
                    if(formData.has('apk')) {
                        onAdd(formData);
                    }
                }

                const formItemLayout = {
                  labelCol: { span: 6 },
                  wrapperCol: { span: 14 }
                };

                return (
                    <Modal
                        visible= {VersionModalVisible}
                        onOk= {handleOk}
                        onCancel = { onHideVersionModal }
                        confirmLoading = { uploadLoading }
                        title="版本更新">
                        <FormItem label="apk文件"
                            {...formItemLayout}>
                            {/* {getFieldDecorator('apk',{
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(

                            )} */}
                            <input type="file" id="file"/>
                            {/* <Upload
                                action='/'
                                // beforeUpload={cancel}
                                fileList={apk}
                                onChange={onUpload}
                                >
                                <Button>
                                  <Icon type="upload" /> 点击上传
                                </Button>
                          </Upload> */}
                        </FormItem>
                        {/* <FormItem label="产品ID"
                            {...formItemLayout}>
                            {getFieldDecorator('productID',{
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(
                                <Input/>
                            )}
                        </FormItem> */}
                        <FormItem label="最大版本号"
                            {...formItemLayout}>
                            {getFieldDecorator('max_version',{
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="版本号"
                            {...formItemLayout}>
                            {getFieldDecorator('version_code',{
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label="是否有效"
                            {...formItemLayout}>
                            {getFieldDecorator('status',{
                                initialValue: '1',
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(
                                <Select>
                                    <Option value="1">是</Option>
                                    <Option value="2">否</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="下载模式"
                            {...formItemLayout}>
                            {getFieldDecorator('download_mode',{
                                initialValue: '1',
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(
                                <Select>
                                    <Option value="1">ftp下载</Option>
                                    <Option value="2">浏览器下载</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="升级说明"
                            {...formItemLayout}>
                            {getFieldDecorator('message',{
                                rules: [{
                                    required: true,
                                    message: '不能为空'
                                }]
                            })(
                                <textarea style={{width:'100%'}}/>
                            )}
                        </FormItem>
                    </Modal>
                )
        })



export default VersionModal;
