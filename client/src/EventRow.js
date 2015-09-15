
var React = require('react')


module.exports = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.row_id} </td>
                <td>{this.props.event.home_team} - {this.props.event.away_team}</td>
                <td>{this.props.event.home_score} - {this.props.event.away_score}</td>
                <td>{(this.props.event.choose_home==1) && ((this.props.event.home_score > this.props.event.away_score) ? <kbd>1</kbd> : 1)}{(this.props.event.choose_home==1)}
                {(this.props.event.choose_tie==1) && ((this.props.event.home_score == this.props.event.away_score) ? <kbd>X</kbd> : "X")}{(this.props.event.choose_tie==1)}
                {(this.props.event.choose_away==1) && ((this.props.event.home_score < this.props.event.away_score) ? <kbd>2</kbd> : 2)}
                </td>
                <td>{this.props.event.author}</td>
            </tr>
        );
    }
})
