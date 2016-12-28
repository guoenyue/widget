const WeekDay = React.createClass({
    render: function() {
        let self = this;
        return (
            <g transform="translate(10, 40)">
                {
                    (function() {
                        return self.props.weekday.map(function(day, index) {
                            return (<text x="0" y={index * self.props.distance} className="month">{day}</text>)
                        })
                    })()
                }
            </g>
        )
    }
});

module.exports = WeekDay;
