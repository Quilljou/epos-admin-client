import React from 'react';
import {connect} from 'dva';
import {Button, Table, Row, Col, Popover, Popconfirm} from 'antd';
import VersionModal from '../components/Modal/VersionModal'
import { UpdateVersionModal} from '../components/Modal/UdpateVersionModal'
import Helmet from "react-helmet";


class Version extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {params, dispatch} = this.props;
    dispatch({
      type: 'version/query',
      payload: {
        productID: params.id,
        perPage: 10,
        page: 1
      }
    })
  }



  render() {
    const {location, dispatch, version, params, loading } = this.props;

    const {
      VersionModalVisible,
      updateRecords,
      total,
      page,
      currentStep,
      uploadPercent,
      apkUrl,
      updateVersionModalVisible,
      currentItem
    } = version;

    function onShowVersionModal(type,currentItem) {
          const payload = { type };
          if(currentItem) payload.currentItem = currentItem;
          dispatch({
              type: 'version/showVersionModal',
              payload
          })
    }

    const VersionModalProps = {
      VersionModalVisible,
      onAdd(data) {
        dispatch({type: 'version/add', payload: data})
      },
      onHideVersionModal() {
        dispatch({type: 'version/hideVersionModal'})
      },
      uploadPercent,
      onUploading(percent) {
        dispatch({type: "version/uploading", payload: percent})
      },
      onUploadDone(data) {
        dispatch({type: 'version/uploadDone', payload: data})
      },
      currentStep,
      apkUrl,
      onNextStep() {
        dispatch({
          type: 'version/changeStep',
          payload: {
            type: 'next'
          }
        })
      },
      onPreviosStep() {
        dispatch({
          type: 'version/changeStep',
          payload: {
            type: 'previous'
          }
        })
      }
    }

    function onDelete({id}) {
      dispatch({
        type: 'version/del',
        payload: id
      })
    }

    const RenderLog = function({message}) {
      let messages = message.split('。');
      messages = messages.filter( (item) => {
        return Boolean(item) === true;
      });

      return (
        <div>
          {messages.map( (item,index) => {
            return <p><span>{index + 1}. </span>{item}</p>
          })}
        </div>
      )

    }

    const columns = [
      {
        title: '更新时间',
        key: 'created_at',
        dataIndex: 'created_at'
      }, {
        title: '版本号',
        dataIndex: 'version_code',
        key: 'version_code'
      }, {
        title: '最大版本号',
        dataIndex: 'max_version',
        key: 'max_version'
      }, {
        title: '是否有效',
        key: 'status',
        render: (text, record) => {
          switch (parseInt(record.status,10)) {
            case 1:
              return <span>有效</span>
              break;
            default:
              return <span>无效</span>
          }
        }
      }, {
        title: '下载模式',
        key: 'download_mode',
        render: (text, record) => {
          switch (parseInt(record['download_mode'],10)) {
            case 1:
              return 'ftp下载'
              break;
            default:
              return '浏览器下载'
          }
        }
      }, {
        title: '下载链接',
        key: 'apk_url',
        render: (text, record) => {
          return <a href={record['apk_url']}>点击下载</a>
        }
      }, {
        title: '更新日志',
        key: 'message',
        render: (text, record) => {
          return <Popover
                  placement="top"
                  title="更新日志"
                  content={
                    <RenderLog message={record.message}></RenderLog>
                  }>
                    <Button type="primary" size="small">查看</Button>
                 </Popover>
        }
      },{
        title: '操作',
        key: 'operate',
        width: '100px',
        render: (text, record) => (
            <div>
               <a onClick={()=>onShowVersionModal('update',record)}>修改</a>
               &nbsp;&nbsp;
               <Popconfirm title="确认删除此项？" onConfirm={() =>
                onDelete(record) }>
                <a>删除</a>
              </Popconfirm>
           </div>
        ),
      }
    ]

    const TableProps = {
      dataSource: updateRecords,
      columns,
      loading,
      pagination: {
        page,
        total,
        shwoTotal: true,
        onChange (page) {
          dispatch({
            type: 'version/query',
            payload: {
              productID: params.id,
              perPage: 10,
              page
            }
          })
        }
      }
    }

    const UpdateVersionModalProps = {
      updateVersionModalVisible,
      currentItem,
      onCancel () {
        dispatch({
          type: 'version/hideUpdateVersionModal'
        })
      },
      onUpdate (payload) {
        dispatch({
          type: 'version/update',
          payload
        })
      }
    }

    return (
      <div>
        <Helmet title="版本管理"/>
        <div className="mb">
          <Button type="primary" onClick={() => onShowVersionModal('add')}>版本更新</Button>
        </div>
        <Table {...TableProps}></Table>
        <VersionModal {...VersionModalProps}></VersionModal>
        <UpdateVersionModal {...UpdateVersionModalProps}></UpdateVersionModal>
      </div>
    )
  }

}

function mapStateToProps({version, loading}) {
  return { version, loading: loading.global };
}

export default connect(mapStateToProps)(Version);
