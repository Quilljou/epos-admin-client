import React from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import  {Button, Table,Row, Col,Popconfirm } from 'antd';
import VersionModal from '../components/Modal/VersionModal'
import ProductModal from '../components/Modal/ProductModal'
import UpdateTimeline from '../components/UpdateTimeLine';
// import ProductTable from '../components/ProductTable'
import Helmet from "react-helmet";

function Android({ dispatch, android, loading }) {
    const { VersionModalVisible, productModalVisible, productModalType, TimeLineVisible, updateRecords, total, page, currentItem,currentStep, currentShow, uploadPercent, apkUrl, product } = android;

    const VersionModalProps = {
        VersionModalVisible,
        onAdd(data) {
            dispatch({
                type: 'android/add',
                payload: data
            })
        },
        onHideVersionModal () {
            dispatch({
                type: 'android/hideVersionModal'
            })
        },
        uploadPercent,
        onUploading (percent) {
            dispatch ({
                type: "android/uploading",
                payload: percent
            })
        },
        onUploadDone (data) {
            dispatch({
                type: 'android/uploadDone',
                payload: data
            })
        },
        currentStep,
        apkUrl,
        onNextStep () {
            dispatch({
                type: 'android/changeStep',
                payload: {
                    type: 'next'
                }
            })
        },
        onPreviosStep () {
            dispatch({
                type: 'android/changeStep',
                payload: {
                    type: 'previous'
                }
            })
        },
        product
    }

    const ProductModalProps = {
        productModalVisible,
        productModalType,
        currentItem,
        onhideProductModal () {
            dispatch({
                type: 'android/hideProductModal'
            })
        },
        onOk (data) {
            dispatch({
                type: `android/${productModalType}`,
                payload: {data}
            })
        }
    }

    const UpdateTimelineProps = {
        updateRecords,
        onSeeMore () {
            dispatch ({
                type: 'android/seeMore',
                payload: {
                    page: page + 1,
                    perPage: 5,
                    productID: 1
                }
            })
        },
        total,
        page,

    }

    function onShowProductVersionModal(productModalType,currentItem) {
        const payload = { productModalType };
        if( currentItem ) payload.currentItem = currentItem;
        // 如果新增，则闯入item
        dispatch({
            type: 'android/showProductModal',
            payload
        })
    }

    function queryUpdateRecords(record) {
         dispatch({
             type: 'android/query',
             payload: record
         })
    }

    function onDelete(record) {
        dispatch({
            type: 'android/deleteProduct',
            payload: record
        })
    }

    const ProductColumns = [{
        title: '序号',
        key: 'id',
        dataIndex: 'id',
    }, {
        title: '产品ID',
        dataIndex: 'productID',
        key: 'productID',
        }, {
         title: '产品名称',
         dataIndex: 'name',
         key: 'name',
        }, {
          title: '操作',
          key: '查看更新日志',
          render: (text, record) => (
              <div>
                  <Link to={`/version/${record.productID}`}>版本更新</Link>
                  &nbsp;&nbsp;
                 <a onClick={()=>onShowProductVersionModal('update',record)}>产品更新</a>
                 &nbsp;&nbsp;
                 <Popconfirm title="确认删除此项？" onConfirm={() =>
                  onDelete(record) }>
                  <a>删除</a>
                </Popconfirm>
             </div>
          ),
        }
    ]

    return (
        <div>
            <Helmet title="版本管理" />
            <div className="mb">
                <Button type="primary" onClick={()=>onShowProductVersionModal('add')}>新增产品</Button>
            </div>
            <Row gutter={24}>
                 <Col span={18} offset={3} className="transition mb">
                     <div>
                         <h1 className="mb">产品列表</h1>
                        <Table columns={ProductColumns} dataSource={product}
                          loading = { loading }
                          bordered = { true }
                            pagination={false}></Table>
                     </div>
                 </Col>
                 <Col span={ TimeLineVisible ? 16: 0} offset={4} className={"transition " + (TimeLineVisible ? "float": '')}>
                     <h1 className="mb mt">{currentShow? currentShow.name: ''}的更新日志</h1>
                     <UpdateTimeline {...UpdateTimelineProps}></UpdateTimeline>
                 </Col>
               </Row>
            <VersionModal {...VersionModalProps}></VersionModal>
            <ProductModal {...ProductModalProps}></ProductModal>
        </div>
    )
}


function mapStateToProps({android, loading}) {
  return { android, loading: loading.global };
}


export default connect(mapStateToProps)(Android);
