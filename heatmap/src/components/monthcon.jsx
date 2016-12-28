import {calcNum} from '../utils/commonUtil';

const MonthCon = React.createClass({
    render: function() {
        let self = this;
        return (
            <g transform="translate(40, 25)">
                {
                    (function() {
                        return self.props.months.map(function(item) {
                            return (<text x={15 * calcNum(item.pos)} y="0" className="week">{item.month}</text>)
                        })
                    })()
                }
            </g>
        )
    }
});

module.exports = MonthCon;
