import '../scss/base.scss';
const HeatMapC = require('../components/heatmap.jsx');

const HeatMap = React.createClass({
    render: function() {
        return (
            <div className="douer">
                <HeatMapC ajax_url={'http://www.xstnet.com/api-get_count.html'} />
            </div>
        )
    }
});
ReactDOM.render(<HeatMap />, document.body);
