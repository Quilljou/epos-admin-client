import React from 'react';
import { Modal, Form, Select, Input, Switch, Upload, Button, Icon, Progress, Steps, message } from 'antd';
import Auth from '../../utils/auth';
// import { checkLogin, check}

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;
const Dragger = Upload.Dragger;

    function checkData (response) {
        if(response.login === false) {
            Auth.logout();
            hashHistory.push('/login');
            message.error(response.message);
            return false;
        }else if( response.success === false ){
            message.error(response.message);
            return false;
        }else {
            return response.data;
        }
    }

    const VersionModal =
            function(props) {
                // var formData = new FormData()
                const {VersionModalVisible,onAdd,onHideVersionModal, currentStep, onNextStep, onPreviosStep, uploadPercent,onUploading, apkUrl, onUploadDone } = props;

                const StepOne = function () {
                    const Draggerprops = {
                          name: 'apk',
                          showUploadList: true,
                          action: '/version/apk/upload',
                          headers: {
                              Authorization: 'Bearer ' + Auth.getToken()
                          },
                          onChange ({event,file}) {
                              if(file.status === 'done') {
                                message.success(`${file.name} 文件成功上传`);
                                const data = checkData(file.response)
                                onUploadDone(data);
                                onNextStep();
                              }
                          }
                        //   onChange({event,file}) {
                        //       if(file.status === 'loading') {
                        //           let percent = Number(event.percent.toFixed(0))
                        //           onUploading(percent);
                        //       }
                        //     // if (status === 'uploading') {
                        //     //   if(event && event.percent) {
                        //     //
                        //     //   }
                        //     // }
                        //     if (status === 'done') {
                        //       message.success(`${file.name} file uploaded successfully.`);
                        //     } else if (status === 'error') {
                        //       message.error(`${file.name} file upload failed.`);
                        //     }
                        //     // else if (status === 'done') {
                        //     //     console.log(file.response);
                        //     //   message.success(`${file.name} 文件上传成功`);
                        //     // } else if (status === 'error') {
                        //     //   message.error(`${file.name} 文件上传出错`);
                        //     // }
                        //   }
                        };
                    return (
                        // <div>
                            <div style={{ marginTop: 16, height: 180 }}>
                                <Dragger {...Draggerprops}>
                                  <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                  </p>
                                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                  <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                                </Dragger>
                                {/* {
                                  uploadPercent > 0 ?
                                  <div className="mt">
                                      <Progress  percent={uploadPercent} />
                                  </div>
                                   :
                                  ''
                                } */}
                              </div>


                        // </div>
                    )
                }

                 function StepTwo(formprops) {

                    const formItemLayout = {
                      labelCol: { span: 6 },
                      wrapperCol: { span: 14 }
                    };
                    const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = formprops.form;


                    function handleSubmit() {
                        validateFieldsAndScroll( (errors, values) => {
                            if(errors) {
                                return;
                            }
                            var data = values;
                            data.productID = '1';
                            data['apk_url'] = apkUrl;

                            data.message = strToPara(data.message);

                            onAdd(data);
                        })


                        function strToPara (str) {
                            var strArr = str.split('。');
                            if(strArr.length) {
                                return strArr.map( (item,index)  => {
                                    if(item.length) {
                                        return pFactory(item,index);
                                    }
                                }).join('')
                            }
                            return str;
                        }

                        function pFactory(string,index) {
                            return '<p> '  + (index + 1) + '. ' + string +'</p>';
                        }
                    }

                    return(
                        <div>
                            <FormItem label="最大版本号"
                                {...formItemLayout}
                                hasFeedback>
                                {getFieldDecorator('max_version',{
                                    rules: [{
                                        required: true,
                                        message: '不能为空'
                                    }]
                                })(
                                    <Input placeholder="最大版本号"/>
                                )}
                            </FormItem>
                            <FormItem label="版本号"
                                {...formItemLayout}
                                hasFeedback>
                                {getFieldDecorator('version_code',{
                                    rules: [{
                                        required: true,
                                        message: '不能为空'
                                    }]
                                })(
                                    <Input placeholder="版本号"/>
                                )}
                            </FormItem>
                            <FormItem label="升级说明"
                                {...formItemLayout}
                                hasFeedback>
                                {getFieldDecorator('message',{
                                    rules: [{
                                        required: true,
                                        message: '不能为空'
                                    }]
                                })(
                                    <textarea style={{width:'100%'}} placeholder="以句号分隔升级说明信息"/>
                                )}
                            </FormItem>
                            <FormItem label="是否有效"
                                {...formItemLayout}
                                hasFeedback>
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
                                {...formItemLayout}
                                hasFeedback>
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
                            <FormItem
                                {...formItemLayout}>
                                <div style={{textAlign: 'right'}}>
                                    <Button onClick={onHideVersionModal}>取消</Button>
                                    &nbsp;
                                    &nbsp;
                                    <Button type="primary" onClick={handleSubmit}>提交</Button>
                                </div>
                            </FormItem>
                        </div>
                    )
                }

                StepTwo = Form.create()(StepTwo)


                function StepThree () {
                    return (
                        <p style={{textAlign: 'center'}}>
                            <Icon type="check-circle" style={{fontSize: '60px',color:'#108ee9'}}/>
                        </p>
                    )
                }

                // function Footer() {
                //     switch (currentStep) {
                //         case 0:
                //             return (
                //                 <span></span>
                //                 <Button type="primary" onClick={onNextStep}>下一步</Button>
                //             )
                //             break;
                //         case 1:
                //             return (
                //                 <div>
                //                     <Button onClick={onPreviosStep}>上一步</Button>
                //                     &nbsp;
                //                     <Button type="primary" onClick={onNextStep}>提交</Button>
                //                 </div>
                //             )
                //             break;
                //         case 2:
                //             return (
                //                 <Button type="primary" onClick={onHideVersionModal}>完成</Button>
                //             )
                //             break;
                //     }
                // }

                function CurrentContent () {
                    switch (currentStep) {
                        case 0:
                            return (
                                <StepOne></StepOne>
                            )
                            break;
                        case 1:
                            return(
                                <StepTwo></StepTwo>
                            )
                            break;
                        default:
                            return(
                                <StepThree></StepThree>
                            )
                    }
                }

                return (
                    <Modal
                        visible= {VersionModalVisible}
                        // onOk= {handleOk}
                        onCancel = { onHideVersionModal }
                        width = "700px"
                        title="版本更新"
                        footer={null}>
                        <Steps current={currentStep}>
                            <Step title="上传文件" icon={<Icon type="cloud-upload-o" />}/>
                            <Step title="填写信息" icon={<Icon type="edit" />}/>
                            <Step title="完成" icon={<Icon type="check-circle" />}/>
                        </Steps>

                        <div style={{padding: '50px 0'}}>
                            <CurrentContent ></CurrentContent>
                        </div>
                        {/* <div className="mt">
                            <Footer/>
                        </div> */}

                    </Modal>
                )
        }



export default VersionModal;
