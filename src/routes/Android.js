import React from 'react';
import {connect} from 'dva';
import {Button} from 'antd';
import VersionModal from '../components/Modal/VersionModal'
import UpdateTimeline from '../components/UpdateTimeLine';

function Android({dispatch,android}) {
    const { VersionModalVisible, uploadLoading, updateRecords,total, page } = android;

    const VersionModalProps = {
        VersionModalVisible,
        uploadLoading,
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
        page
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
