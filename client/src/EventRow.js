var _ = require('lodash')
var React = require('react')
var Input = require('react-bootstrap').Input
var $ = require('jquery')

module.exports = React.createClass({
    
    getInitialState: function() {
	return {
	    author : this.props.author
	}
    },
    componentWillReceiveProps: function(props) {
	this.setState( {author : props.event.author} )
      
    },
    handleChange: function(e) {
	this.setState( { author: event.target.value} )
	this.props.setEventAuthor(this.props.row_id, { "eventId": this.props.event.event_id, "author":event.target.value })
    },
    renderAuthorOptions: function() {
	return( 
	    _.map(this.props.availableAuthors, function(a) { 
		return <option value={a}>{a}</option> 
	    }.bind(this))
	)
    },
    render: function() {
	var selectedAuthor = "empty"
	if(this.props.eventAuthor.author != null) { 
	    selectedAuthor = this.props.eventAuthor.author
	}
	    return (
            <tr>
                <td>{this.props.row_id+1} </td>
                <td>{this.props.event.home_team} - {this.props.event.away_team}</td>
                <td>{this.props.event.home_score} - {this.props.event.away_score}</td>
               <td>
		{(this.props.event.choose_home==1) && ((this.props.event.home_score > this.props.event.away_score) ? <kbd>1</kbd> : 1)}{(this.props.event.choose_home==1)}
                {(this.props.event.choose_tie==1) && ((this.props.event.home_score == this.props.event.away_score) ? <kbd>X</kbd> : "X")}{(this.props.event.choose_tie==1)}
                {(this.props.event.choose_away==1) && ((this.props.event.home_score < this.props.event.away_score) ? <kbd>2</kbd> : 2)}
                </td>
                <td> 
		<select value = {selectedAuthor} onChange = {this.handleChange}>
		<option value="empty">--------</option>
	        { this.renderAuthorOptions() }
	       </select>
	        </td>
            </tr>
        )
    }
})
