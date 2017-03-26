import React from 'react';
import { Modal, Form, Select, Input,  Button, Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


export function VersionForm({onCancel,onSubmit,form,currentItem = {download_mode: '1',status: '1'}}) {

   const formItemLayout = {
     labelCol: { span: 6 },
     wrapperCol: { span: 14 }
   };
   const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll } = form;


   function handleSubmit() {
       validateFieldsAndScroll( (errors, values) => {
           if(errors) {
               return;
           }
           var data = values;
         //   data.message = strToPara(data.message);

           onSubmit(data);
       })


      //  function strToPara (str) {
      //      var strArr = str.split('。');
      //      var ret;
      //      if(strArr.length) {
      //          strArr.forEach( (item,index)  => {
      //              if(item) {
      //                  ;
      //              }
      //          })
      //          return JSON.stringify(ret);
      //      }
      //      return str;
      //  }

       function pFactory(string) {
           return string +'。';
       }
   }

   return(
       <div>
           <FormItem label="最大版本号"
               {...formItemLayout}
               hasFeedback>
               {getFieldDecorator('max_version',{
                   initialValue: currentItem['max_version'],
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
                   initialValue: currentItem['version_code'],
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
                   initialValue: currentItem['message'],
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
                  initialValue: String(currentItem.status),
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
                  initialValue: String(currentItem['download_mode']),
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
                   <Button onClick={onCancel}>取消</Button>
                   &nbsp;
                   &nbsp;
                   <Button type="primary" onClick={handleSubmit}>提交</Button>
               </div>
           </FormItem>
       </div>
   )
}

export function UpdateVersionModal ({onUpdate,updateVersionModalVisible,onCancel, currentItem}) {
   const UpdateFormProps = {
      onCancel,
      onSubmit (values) {
         onUpdate(values)
      },
      currentItem
   }

   const UpdateForm = Form.create()(VersionForm);
    return (
      <Modal
        visible={updateVersionModalVisible}
        footer={null}
        onCancel={onCancel}
        title="更新版本信息">
          <UpdateForm {...UpdateFormProps}></UpdateForm>
      </Modal>
    )
}
