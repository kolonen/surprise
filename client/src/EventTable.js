var React = require('react')
var _ = require('lodash')
var Table = require('react-bootstrap').Table
var Button = require('react-bootstrap').Button
var $ = require('jquery')

var EventRow = require('./EventRow.js')

module.exports = React.createClass({
  getInitialState: function() {
      return {
	  eventAuthors : toEventAuthors(this.props.events),
	  updated : false
      }
  },
  toEventAuthors: function(events) { 
      return _.map(events, function(event) { return { "eventId": event.event_id, "author": event.author }})
  },    
  componentWillReceiveProps: function() {
      this.setState( {eventAuthors : toEventAuthors(props.events), updated : false} )
  },
  setEventAuthor: function(i, eventAuthor) {
      var originalAuthors = _.map(this.props.events, function(event) { return event.author })
      var authors = this.state.eventAuthors
      authors[i] = eventAuthor
      this.setState( {eventAuthors : authors, updated : originalAuthors[i] != eventAuthor.author})
  },
  saveAuthors: function() {
      var authorsToSave = _.filter(this.state.eventAuthors, function(a) { return a.author != null } )
      $.ajax({
        type: "POST",
        url: "http://localhost:80/surprise/wager/authors",
        data:  JSON.stringify(authorsToSave),
        contentType: "application/json; charset=utf-8",
        success: function(r) { console.log(r) }
        })
  },
  render: function() {
      var eventRows = _.map(this.props.events, function(e, i) {
	  return <EventRow event = {e} eventAuthor = {this.state.eventAuthors[i]} row_id = {i} availableAuthors = {this.props.availableAuthors} setEventAuthor = {this.setEventAuthor} />
      }.bind(this))
      return (
	      <div>
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
              </Table>
              <Button disabled = {!this.state.updated} bsStyle = "primary" onClick = {this.saveAuthors} className="pull-right">Save</Button>
	      </div>)
  }
})
