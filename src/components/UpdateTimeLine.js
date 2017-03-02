import React from 'react';
import { Timeline } from 'antd';

const TimelineItem = Timeline.Item;

export default function UpdateTimeline(props) {
    const { updateRecords, onSeeMore, total, page} = props;

    function whichMode (mode) {
        switch (mode) {
            case 1:
                return 'ftp下载'
                break;
            default:
                return '浏览器下载'
        }
    }

    return (
        <div>
            <h1 className="mt mb">更新日志</h1>
            <Timeline pending={<a onClick={total >= page * 5  ? onSeeMore : null}>{total >= page * 5 ? '查看更多': '没有更多了'}</a>}>
                {updateRecords.map( (item,index) => {
                    return <TimelineItem key={index}>
                            <h2>{item['created_at']}</h2><span>{whichMode(item.download_mode)}</span>
                            <ul>
                                <li>{item.message}</li>
                            </ul>
                            </TimelineItem>
                })}
            </Timeline>
        </div>
    )
}
