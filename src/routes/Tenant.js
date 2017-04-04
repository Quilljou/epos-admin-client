import React from 'react';
import { Table, Button, Popconfirm, Dropdown, Menu, Icon } from 'antd';

import {connect} from 'dva';
import UserModal from '../components/Modal/UserModal';
import PwdModal from '../components/Modal/PwdModal';
import Helmet from 'react-helmet';

// import styles from './main.css';
const  MenuItem = Menu.Item;

function Tenant({ dispatch, tenant }) {
    const { total,dataSource, userModalVisible, pwdModalVisible, page} = tenant;

    function onDelete(text,record) {
        dispatch({
            type: 'tenant/del',
            payload: {
                id: text.id
            }
        })
    }

  //   const columns = [{
  //     title: '商户ID',
  //     dataIndex: 'code',
  //     key: 'code',
  //   }, {
  //     title: '名称',
  //     dataIndex: 'name',
  //     key: 'name',
  //   }, {
  //     title: '行业',
  //     dataIndex: 'industry',
  //     key: 'industry',
  //   }, {
  //     title: '邮编',
  //     dataIndex: 'zipCode',
  //     key: 'zipCode',
  //   }, {
  //     title: '区域',
  //     dataIndex: 'area',
  //     key: 'area',
  //   }, {
  //     title: '地址',
  //     dataIndex: 'address',
  //     key: 'address',
  //   }, {
  //     title: '简称',
  //     dataIndex: 'shortName',
  //     key: 'shortName',
  //   }, {
  //     title: '联系人',
  //     dataIndex: 'linkman',
  //     key: 'linkman',
  //   }, {
  //     title: '联系电话',
  //     dataIndex: 'phoneNumber',
  //     key: 'phoneNumber',
  //   }, {
  //     title: '传真',
  //     dataIndex: 'fax',
  //     key: 'fax',
  //   }, {
  //     title: 'QQ',
  //     dataIndex: 'qqNumber',
  //     key: 'qqNumber',
  //   }, {
  //     title: '创建日期',
  //     dataIndex: 'created_at',
  //     key: 'created_at',
  //   },{
  //     title: '修改日期',
  //     dataIndex: 'updated_at',
  //     key: 'updated_at',
  //   }, {
  //   title: '操作',
  //   width: 100,
  //   render: (text, record, index) => {
  //     return (
  //       <div>
  //         <a>修改</a> &nbsp;&nbsp;
  //         <Popconfirm title="确认删除此项？" onConfirm={() =>
  //           onDelete(text,record,index) }>
  //           <a>删除</a>
  //         </Popconfirm>
  //       </div>
  //     )
  //   }
  // }];

    function onRenew(record,e) {
        const payload = {
            id: record.id,
            renewTime: e.key
        }
        dispatch({
            type: 'tenant/renew',
            payload
        })
    }




    const columns = [{
      title: '商户ID',
      dataIndex: 'code',
      key: 'code',
    }, {
      title: '有效期',
      dataIndex: 'validatePeriod',
      key: 'validatePeriod',
      render: (text,record) => <span>{record.validatePeriod ? record.validatePeriod + '年' : '无' }</span>
    }, {
      title: '生效日期',
      dataIndex: 'created_at',
      key: 'created_at',
    },{
    title: '失效日期',
    dataIndex: 'expiredTime',
    key: 'expiredTime',
    }, {
      title: '初始密码',
      dataIndex: 'password',
      key: 'password',
    },{
      title: '操作',
      width: 200,
      render: (text, record, index) => {
        return (
          <div>
              <Helmet title="商户管理"></Helmet>
            <a onClick={() => onShowPwdModal(text,record,index)} >修改密码</a> &nbsp;&nbsp;
            <Dropdown overlay={
                <Menu onClick={(e) => onRenew(record, e)}>
                     <Menu.Item key='1'>一年</Menu.Item>
                     <Menu.Item key='2'>两年</Menu.Item>
                     <Menu.Item key='3'>三年</Menu.Item>
               </Menu>}>
              <Button>
                续费 <Icon type="down" />
              </Button>
            </Dropdown> &nbsp;&nbsp;
            <Popconfirm title="确认删除此项？" onConfirm={() =>
              onDelete(text,record,index) }>
              <a>删除</a>
            </Popconfirm>
          </div>
        )
      }
    }]

  function onChange(page) {
    dispatch({
        type: 'tenant/query',
        payload: {
            page
        }
    })
  }


  const pagination = {
    total,
    onChange,
    current: page,
    showTotal(total) {
        return `共 ${total} 条`;
    },
    showQuickJumper: true
  }

    function onShowUserModal() {
        dispatch({
            type: 'tenant/showUserModal'
        })
    }

    function onShowPwdModal(text,record) {
        dispatch({
            type: 'tenant/showPwdModal',
            payload: {
                currentItem: record
            }
        })
    }


    const UserModalProps = {
        userModalVisible,
        onCreate (payload) {
            dispatch({
                type: 'tenant/create',
                payload
            })
        },
        hideUserModal () {
            dispatch({
                type: 'tenant/hideUserModal'
            })
        }
    }

    const PwdModalProps = {
        pwdModalVisible,
        onUpdatePassword (payload) {
            dispatch ({
                type: 'tenant/updatePassword',
                payload
            })
        },
        hidePwdModal () {
            dispatch({
                type: 'tenant/hidePwdModal'
            })
        }
    }

    const TableProps = {
        pagination,
        dataSource,
        columns,
        bordered: true,
        rowKey: 'id',
        onChange () {
            console.log('change');
        }
    }

    return (
        <div>
            <div className="mb">
              <Button type="primary" onClick={onShowUserModal}>新增</Button>
            </div>
            <Table {...TableProps} />

            <UserModal {...UserModalProps}></UserModal>
            <PwdModal {...PwdModalProps}></PwdModal>
        </div>
    )
}


function mapStateToProps({ tenant }) {
  return { tenant }
}



export default connect(mapStateToProps)(Tenant);
