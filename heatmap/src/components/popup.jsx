const Popup = React.createClass({
    render: function() {
        return (
            <g transform={this.props.popup.xy} className="popup">
                <rect width="200" height="30" x="-100" y={this.props.popup.y - 30} fill="#fff" />
                <text x="-87" y={this.props.popup.y - 10}>日期：{this.props.popup.date}，文章数：{this.props.popup.count}</text>
            </g>
        )
    }
});

module.exports = Popup;
