var React = require('react')
var $ = require('jquery')
var PageHeader = require('react-bootstrap').PageHeader
var Navbar = require('react-bootstrap').Navbar

var WagerTable = require('./WagerTable.js')
var EventTable = require('./EventTable.js')


module.exports = React.createClass({
    getInitialState: function() {
	return {
	    wagers : [],
	    selected : 0
	}
    },
    handleRowClick: function(key) {
	this.setState({selected: key})
    },
    componentWillMount: function() {
	$.get("http://localhost:80/surprise/wagers", function(r) {
	    this.setState({ wagers: r })
	}.bind(this));
    },
    render: function() {
	return (
    <div>
    <Navbar brand="Surprise"></Navbar>
	<div className="container">
	<PageHeader>Wagers</PageHeader>  
	<div className="row">
	    <div className="col-md-6">
	      <WagerTable wagers={this.state.wagers} handleRowClick={this.handleRowClick} selected={this.state.selected}/>
           </div>
	   <div className="col-md-6">        
	      <EventTable events={this.state.wagers[this.state.selected] != undefined ? this.state.wagers[this.state.selected].events : []}/>
           </div>
          </div>
        </div> 
    </div>)
}
})
