const React = require('react')
const $ = require('jquery')
const PageHeader = require('react-bootstrap').PageHeader
const Navbar = require('react-bootstrap').Navbar
const _ = require('lodash')

const WagerTable = require('./WagerTable.js')
const EventTable = require('./EventTable.js')
const LoadWagers = require('./LoadWagers.js')
const http = require('axios')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      wagers : [],
      selected : 0,
      availableAuthors: []
    }
  },
  handleRowClick: function(key) {
    this.setState({selected: key})
  },
  componentDidMount: function() {
    this.reloadData()
  },
  reloadData: function() {
    Promise.all([
      http.get("http://localhost:80/surprise/wagers"),
      http.get("http://localhost:80/surprise/authors")
    ])
    .then(r => this.setState(
      {
        wagers: r[0].data,
        availableAuthors: r[1].data.map(d => d.username)
      }
    ))
  },
  getSelectedEvents: function() {
    return this.state.wagers[this.state.selected] != undefined ? this.state.wagers[this.state.selected].events : []
  },
  render: function() {
    return (
      <div>
        <Navbar brand="Surprise">
          <LoadWagers reload={this.reloadData} />
        </Navbar>
        <div className="container">
          <PageHeader>Wagers</PageHeader>
            <div className="row">
              <div className="col-md-6">
                <WagerTable wagers = {this.state.wagers} handleClick = {this.handleRowClick} selected = {this.state.selected}/>
                </div>
                <div className="col-md-6">
                  <EventTable events = {this.getSelectedEvents()} availableAuthors = {this.state.availableAuthors}/>
                </div>
              </div>
            </div>
      </div>
    )
  }
})
