var React = require('react')
var _ = require('lodash')
var Table = require('react-bootstrap').Table

var EventRow = require('./EventRow.js')

module.exports = React.createClass({
  render: function() {
    var eventRows = _.map(this.props.events, function(e,i) {return <EventRow event={e} row_id={i+1}/>})
    return (
      <Table striped>
	    <thead>
            <tr>
            <th>No.</th>
            <th>Match</th>
            <th>Result</th>
            <th>Choise</th>
            <th>Author</th>
            </tr>
            </thead>
            <tbody>{eventRows}</tbody>
      </Table>)
  }
})
