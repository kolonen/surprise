var React = require('react')

module.exports = React.createClass ({
    handleClick: function () {
	this.props.handleClick(this.props.index)
    },
    render: function() {
	return (<tr onClick={this.handleClick} className={this.props.selected ? "bg-primary" : ""}>
		<td>{this.props.wager_date}</td>
		<td>{this.props.ext_id}</td>
		<td>{this.props.system}</td>
		<td>{this.props.hits}</td>
		<td>{this.props.win_amount}</td>
	       </tr>)
    }
})
