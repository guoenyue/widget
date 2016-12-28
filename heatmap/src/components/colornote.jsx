import '../scss/colornote.scss';

const ColorNote = React.createClass({
    render: function() {
        let self = this;
        return (
            <div className="map-note">
                <a href="https://umiyo.net">查看计数规则</a>
                <div className="color-intro">
                    <label>Less </label>
                    <ul className="color-item">
                        {
                            (function() {
                                return self.props.colors.map(function(color) {
                                    let style = {backgroundColor: color};
                                    return(<li style={style}></li>)
                                })
                            })()
                        }
                    </ul>
                    <label> More</label>
                </div>
            </div>
        )
    }
});

module.exports = ColorNote;
