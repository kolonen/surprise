var React = require('react')
var $ = require('jquery')
var PageHeader = require('react-bootstrap').PageHeader
var Navbar = require('react-bootstrap').Navbar
var _ = require('lodash')

var WagerTable = require('./WagerTable.js')
var EventTable = require('./EventTable.js')


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
	$.get("http://localhost:80/surprise/wagers", function(r) {
	    this.setState({ wagers: r })
	}.bind(this))
	
	$.get("http://localhost:80/surprise/authors", function(r) {
	    var authors = _.map(r, function(a) {return a.username})
	    this.setState({ availableAuthors: authors })
	}.bind(this))
    },
    
    getSelectedEvents: function() {
	return this.state.wagers[this.state.selected] != undefined ? this.state.wagers[this.state.selected].events : [] 
    },
    render: function() {
	return (
    <div>
        <Navbar brand="Surprise"></Navbar>
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
    </div>)
}
})