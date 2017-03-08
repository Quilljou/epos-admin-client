import React from 'react';
import {connect} from 'dva';
import  {Button, Table,Row, Col } from 'antd';
import VersionModal from '../components/Modal/VersionModal'
import ProductModal from '../components/Modal/ProductModal'
import UpdateTimeline from '../components/UpdateTimeLine';
// import ProductTable from '../components/ProductTable'
import Helmet from "react-helmet";

function Android({dispatch,android}) {
    const { VersionModalVisible,productModalVisible, updateRecords,total, page, currentStep, uploadPercent,apkUrl,product } = android;

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
        onhideProductModal () {
            dispatch({
                type: 'android/hideProductModal'
            })
        },
        onAddProduct (data) {
            dispatch({
                type: 'android/addProduct',
                payload: data
            })
        },
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

    function onShowVersionModal(payload) {
        dispatch({
            type: 'android/showVersionModal',
            payload
        })
    }

    function onShowProductVersionModal() {
        dispatch({
            type: 'android/showProductModal',
        })
    }

    function queryUpdateRecords(record) {
         dispatch({
             type: 'android/query',
             payload: {
               productID: record.productID,
               perPage: 10,
               page: 1
             }
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
                  <a onClick={() => queryUpdateRecords(record)}>查看</a>&nbsp;&nbsp;
                  <a onClick={ () => onShowVersionModal(record)}>版本更新</a>
              </div>
          ),
        }
    ]

    return (
        <div>
            <Helmet title="版本管理" />
            <div className="mb">
                {/* <Button type="primary" onClick={}>版本更新</Button> */}
                &nbsp;
                &nbsp;
                <Button type="primary" onClick={onShowProductVersionModal}>新增产品</Button>
            </div>
            <Row gutter={24}>
                 <Col span={8}>
                     <div>
                         <h1 className="mb">产品列表</h1>
                        <Table columns={ProductColumns} dataSource={product}
                            pagination={false}></Table>
                     </div>
                 </Col>
                 <Col span={16}>
                     <h1 className="mb">更新日志</h1>
                     <UpdateTimeline {...UpdateTimelineProps}></UpdateTimeline>
                 </Col>
               </Row>
            <VersionModal {...VersionModalProps}></VersionModal>
            <ProductModal {...ProductModalProps}></ProductModal>
        </div>
    )
}

function mapStateToProps({android}) {
    return {android};
}

export default connect(mapStateToProps)(Android);
