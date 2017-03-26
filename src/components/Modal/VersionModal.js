import React from 'react';
import { Modal, Form, Select, Input, Switch, Upload, Button, Icon, Progress, Steps, message } from 'antd';
import Auth from '../../utils/auth';
// import { checkLogin, check}

import { VersionForm } from './UdpateVersionModal'

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
                const {VersionModalVisible,onAdd,onHideVersionModal, currentStep, onNextStep, onPreviosStep,onUploadDone } = props;

                const StepOne = function () {
                    const Draggerprops = {
                          name: 'apk',
                          showUploadList: true,
                          action: '/api/version/apk/upload',
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
                        };
                    return (
                            <div style={{ marginTop: 16, height: 180 }}>
                                <Dragger {...Draggerprops}>
                                  <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                  </p>
                                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                  <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
                                </Dragger>
                              </div>
                    )
                }


                const StepTwo = Form.create()(VersionForm)


                function StepThree () {
                    return (
                        <p style={{textAlign: 'center'}}>
                            <Icon type="check-circle" style={{fontSize: '60px',color:'#108ee9'}}/>
                        </p>
                    )
                }

                const StepTwoProps = {
                    onCancel: onHideVersionModal,
                    onSubmit (values) {
                      onAdd(values)
                    }
                }

                function CurrentContent () {
                    switch (currentStep) {
                        case 0:
                            return (
                                <StepOne></StepOne>
                            )
                            break;
                        case 1:
                            return(
                                <StepTwo {...StepTwoProps}></StepTwo>
                            )
                            break;
                        default:
                            return(
                                <StepThree ></StepThree>
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
