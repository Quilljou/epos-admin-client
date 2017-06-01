import React from 'react';
import { Table, Button, Popconfirm, Dropdown, Menu, Icon } from 'antd';

import {connect} from 'dva';
import UserModal from '../components/Modal/UserModal';
import PwdModal from '../components/Modal/PwdModal';
import Helmet from 'react-helmet';

// import styles from './main.css';
const  MenuItem = Menu.Item;

class Log extends React.Component {
  constructor (props) {
    super(props)
    this.dispatch = this.props.dispatch;
  }

  componentDidMount () {
    this.dispatch({
      type: 'log/query',
      payload: {
        page: 1
      },
    })
  }
  render() {
    const { dispatch, log, loading } = this.props;
    const { total,dataSource, page, currentProduct, product } = log;

    function onSelect(e) {
      dispatch({
        type: 'log/querySuccess',
        payload: {
          currentProduct: product.find(item => item.id === Number(e.key))
        }
      })
      dispatch({
        type: 'log/query',
        payload: {
          page,
          perPage: 10
        }
      })
    }

    const pagination = {
      total,
      onChange (page) {
        dispatch({
          type: 'log/query',
          payload: {
            page,
            perPage: 10
          }
        })
      },
      current: page,
      showTotal(total) {
          return `共 ${total} 条`;
      },
      showQuickJumper: true
    }

    const columns = [{
      title: '包名',
      dataIndex: 'package',
      width: '100px',
      key: 'package',
    }, {
      title: '版本号',
      dataIndex: 'version_code',
      width: '100px',
      key: 'versionCode',
    },{
    title: '出错时间',
    dataIndex: 'time',
    width: '100px',
    key: 'time',
    }, {
      title: '错误消息',
      dataIndex: 'errMsg',
      key: 'errMsg',
    }]


    const TableProps = {
        pagination,
        dataSource,
        scroll: { x: 960 },
        columns,
        loading,
        bordered: true,
        rowKey: 'id'
    }

    return (
        <div>
            <div className="mb">
              选择产品：&nbsp;
              <Dropdown overlay={
                  <Menu onClick={(e) => onSelect(e)}>
                    {
                      product.map( (item) => {
                        return(
                          <Menu.Item key={item.id}>{item.name}</Menu.Item>
                        )
                      })
                    }
                 </Menu>}>
                <Button>
                   {
                       currentProduct.name || '无'
                    }<Icon type="down" />
                </Button>
              </Dropdown>
            </div>
            <Table {...TableProps} />
        </div>
    )
  }

}


function mapStateToProps({log, loading}) {
  return { log, loading: loading.global };
}



export default connect(mapStateToProps)(Log);
