import React from 'react';
import {connect} from 'dva';
import {Button} from 'antd';
import VersionModal from '../components/Modal/VersionModal'
import UpdateTimeline from '../components/UpdateTimeLine';

function Android({dispatch,android}) {
    const { VersionModalVisible, updateRecords,total, page, currentStep, uploadPercent,apkUrl } = android;

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

    function onShowVersionModal() {
        dispatch({
            type: 'android/showVersionModal'
        })
    }

    return (
        <div>
            <Button type="primary" onClick={onShowVersionModal}>版本更新</Button>
            <UpdateTimeline {...UpdateTimelineProps}></UpdateTimeline>
            <VersionModal {...VersionModalProps}></VersionModal>
        </div>
    )
}

function mapStateToProps({android}) {
    return {android};
}

export default connect(mapStateToProps)(Android);
