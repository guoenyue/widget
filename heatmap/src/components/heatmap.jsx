import '../scss/heatmap.scss';
import {formatDate, getDateByDays} from '../utils/DateUtil';
import {uniObj} from '../utils/ArrayUtil';
const WeekDay = require('./weekday.jsx');
const MonthCon = require('./monthcon.jsx');
const ColorNote = require('./colornote.jsx');
const Popup = require('./popup.jsx');

// 定义一些常量
const RECT_SIZE = 12;   // rect的宽和高
const RECT_MG = 3;      // rect间距
const WEEK_CNT = 52;    // 一年周计数
const WEEK_LEN = 7;     // 一周日计数
const MONTH_NAME = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];    // 月份显示
let MONTH_POS = [];
const WEEKDAY = ['周日', '', '周二', '', '周四', '', '周六'];    // 星期显示
const FILLCOLOR = ['#fff', '#eee', '#d6e685', '#8cc665', '#44a340', '#1e6823'];     // 活跃度填充颜色[<1, <3, <5, <7, <9, >9]

const HeatMap = React.createClass({
    getInitialState: function() {
        return {
            items: [],
            months: [],
            popup: {
                xy: '',
                date: '',
                count: 0
            },
            reveal: false
        };
    },
    componentDidMount: function() {
        this.initData();
    },
    /*componentWillReceiveProps: function() {
        this.setState({
            items: this.initData()
        });
    },*/
    mouseOver: function(e) {
        return this.setState({
            popup: {
                xy: $(e.target).data('xy'),
                y: $(e.target).attr('y'),
                date: $(e.target).data('date'),
                count: $(e.target).data('count')
            },
            reveal: true
        });
    },
    mouseOut: function(e) {
        this.setState({reveal: false});
    },
    initData: function() {
        // 获取当前时间
        let curTime = new Date();
        let fixedCnt = WEEK_CNT * WEEK_LEN + curTime.getDay(),
            rectCnt = WEEK_CNT * WEEK_LEN + curTime.getDay(),
            items = [],     // 用于data数据
            months = [],    // 用于month数据
            cidx = 0,       // 内层计数
            pidx = 0,       // 外层计数
            tmpm = '0';       // 临时月份计数
        $.ajax({
            url: this.props.ajax_url,
            type: 'get',
            dataType: 'jsonp',
            cache: false,
            data: {
                start_date: getDateByDays(curTime, fixedCnt),
                end_date: formatDate(curTime)
            },
            success: function(result) {
                if(typeof result === 'string')
                    result = JSON.parse(result);
                    do {
                        // 月份起始位置数组
                        if(tmpm != result[fixedCnt - rectCnt].date.match(/-(\d+)-/)[1]) {
                            let monPos = {
                                month: result[fixedCnt - rectCnt].date.match(/-(\d+)-/)[1],
                                pos: fixedCnt - rectCnt
                            };
                            months.push(monPos);
                            tmpm = result[fixedCnt - rectCnt].date.match(/-(\d+)-/)[1];
                        }
                        // 热度点位置与数据数组
                        if((pidx % WEEK_LEN) == 0) {
                            let childItem = [];
                            for(let i = 0; i < WEEK_LEN; i++) {
                                if(rectCnt - i >= 0) {
                                    let childNode = {
                                        posX: 0,
                                        posY: (RECT_SIZE + RECT_MG) * (i % WEEK_LEN),
                                        date: result[fixedCnt - rectCnt + i].date,
                                        count: result[fixedCnt - rectCnt + i].count
                                    };
                                    childItem[i % WEEK_LEN] = childNode;
                                }
                            }
                            let node = {
                                startX: cidx * (RECT_SIZE + RECT_MG),
                                startY: 0,
                                childItems: childItem
                            };
                            items[cidx] = node;
                            cidx++;
                        }
                        pidx++;
                    } while(rectCnt--);
                    MONTH_POS = uniObj(months);
                    this.setState({items: items});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(this.props.ajax_url, status, err.toString());
            }.bind(this)
        });
        // 测试程序
        /* *********************************************************************
        do {
            // 月份起始位置数组
            if(tmpm != getDateByDays(curTime, rectCnt).match(/-(\d+)-/)[1]) {
                let monPos = {
                    month: getDateByDays(curTime, rectCnt).match(/-(\d+)-/)[1],
                    pos: fixedCnt - rectCnt
                };
                months.push(monPos);
                tmpm = getDateByDays(curTime, rectCnt).match(/-(\d+)-/)[1];
            }
            // 热度点位置与数据数组
            if((pidx % WEEK_LEN) == 0) {
                let childItem = [];
                for(let i = 0; i < WEEK_LEN; i++) {
                    if(rectCnt - i >= 0) {
                        let childNode = {
                            posX: 0,
                            posY: (RECT_SIZE + RECT_MG) * (i % WEEK_LEN),
                            date: getDateByDays(curTime, rectCnt - i),
                            count: parseInt(Math.random() * 15)
                        };
                        childItem[i % WEEK_LEN] = childNode;
                    }
                }
                let node = {
                    startX: cidx * (RECT_SIZE + RECT_MG),
                    startY: 0,
                    childItems: childItem
                };
                items[cidx] = node;
                cidx++;
            }
            pidx++;
        } while(rectCnt--);
        MONTH_POS = uniObj(months);
        return items;
        ********************************************************************* */
    },
    render: function() {
        let self = this;
        return (
            <div className="heat-map">
                <svg className="calendar" width="845" height="140" ref="heatMap">
                    <g transform="translate(40, 30)">
                        {
                            (function() {
                                return self.state.items.map(function(node) {
                                    let translate = 'translate(' + node.startX + ',' + node.startY + ')';
                                    return (
                                        <g transform={translate}>
                                            {
                                                node.childItems.map(function(item) {
                                                    return (
                                                        <rect onMouseOver={self.mouseOver} onMouseOut={self.mouseOut} className="day" width={RECT_SIZE} height={RECT_SIZE} data-xy={translate} x={item.posX} y={item.posY} fill={FILLCOLOR[(item.count < 11 ? Math.ceil(item.count/2) : 5)]} data-count={item.count} data-date={item.date} />
                                                    )
                                                })
                                            }
                                        </g>
                                    )
                                })
                            })()
                        }
                        {
                            self.state.reveal ? <Popup popup={self.state.popup} /> : null
                        }
                    </g>
                    <WeekDay weekday={WEEKDAY} distance={RECT_SIZE + RECT_MG} />
                    <MonthCon months={MONTH_POS} />
                </svg>
                <ColorNote colors={FILLCOLOR} />
            </div>
        )
    }
});

module.exports = HeatMap;
