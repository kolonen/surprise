const React = require('react')
const Table = require('react-bootstrap').Table
const Button = require('react-bootstrap').Button

const EventRow = require('./EventRow.js')
const http = require('axios')

const baseUrl = require('./Config.js').baseUrl

module.exports = React.createClass({
  getInitialState: function() {
    return {
      eventAuthors : this.toEventAuthors(this.props.events),
      updated : false
    }
  },
  toEventAuthors: function(events) {
    return events.map(event => ({ "eventId": event.event_id, "author": event.author }))
  },
  componentWillReceiveProps: function(props) {
    this.setState( {eventAuthors : this.toEventAuthors(props.events), updated : false} )
  },
  setEventAuthor: function(i, eventAuthor) {
    const originalAuthors = this.props.events.map( event => event.author )
    const authors = this.state.eventAuthors
    authors[i] = eventAuthor
    this.setState( {eventAuthors : authors, updated : originalAuthors[i] != eventAuthor.author})
  },
  saveAuthors: function() {
    const authorsToSave = this.state.eventAuthors.filter(a => a.author != null)
    http
      .post(baseUrl + '/surprise/wager/authors', JSON.stringify(authorsToSave))
      .then(r => {
        console.log(r.status)
        this.props.reload()
      })
  },
  render: function() {
    const eventRows = this.props.events.map((e, i) =>
      <EventRow event = {e} eventAuthor = {this.state.eventAuthors[i]}
        row_id = {i} availableAuthors = {this.props.availableAuthors} setEventAuthor = {this.setEventAuthor} />)
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
