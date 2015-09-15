var React = require('react');
var Table = require('react-bootstrap').Table
var _ = require('lodash') 

var WagerRow = require('./WagerRow.js')

module.exports = React.createClass ({
    render: function() {
	var wagerRows = _.map(this.props.wagers, function(w, i) {
	    console.log(w,i)
	    return (<WagerRow handleRowClick={this.props.handleRowClick} selected = {this.props.selected==i ? true : false} 
		    wager_date={w.wager_date} ext_id={w.ext_id} system={w.system} hits={w.hits} win_amount={w.win_amount} index={i} key={i}/>)
	}.bind(this))
	
	return (
	<Table>
	    <thead>
            <tr>
            <th>Date</th>
            <th>Id</th>
            <th>System</th>
            <th>Hits</th>
            <th>Winning</th>
            </tr>
            </thead>
            <tbody>{wagerRows}</tbody>
	</Table>)
    }
})



