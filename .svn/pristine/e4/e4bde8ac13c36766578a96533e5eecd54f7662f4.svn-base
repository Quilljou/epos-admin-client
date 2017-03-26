import React from 'react';
import { Timeline, Icon } from 'antd';

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

    function isValid (str) {
        switch (str) {
            case 1:
                return '有效'
                break;
            default:
                return '无效'
        }
    }

    return (
        <div>
            <Timeline pending={<a onClick={total >= page * 5  ? onSeeMore : null}>{total >= page * 5 ? '查看更多': '没有更多了'}</a>}>
                {updateRecords.map( (item,index) => {
                    return <TimelineItem key={index}>
                            <h2>{item['created_at']}</h2>
                            <p>{isValid(item.status)} &nbsp;&nbsp;&nbsp; {whichMode(item.download_mode)}
                            </p>
                            <p>版本号：{item.version_code}</p>
                            <p>最大版本号：{item.max_version}</p>
                            {/* <ul>
                                <li>{item.message}</li>
                            </ul> */}
                            <h3 className="mt"><Icon type="download"></Icon> 更新说明</h3>
                            <div dangerouslySetInnerHTML={{__html: item.message}}></div>
                            </TimelineItem>
                })}
            </Timeline>
        </div>
    )
}
