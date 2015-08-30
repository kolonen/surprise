var WagerArray = React.createClass ({
    getInitialState: function() {
	return {
	    wagers : []
	}
    },
    componentDidMount: function() {
	$.get("http://localhost:80/surprise/wagers", function(r) {
            this.setState({
		wagers: r,
            })
	}.bind(this));
    },
    render: function() {
	return (
		<div>	
		{
		    _.map(this.state.wagers, 
		       function(w) {return <WagerAccordion wager_date={w.wager_date} ext_id={w.ext_id} win_amount ={w.win_amount} events={w.events}/>}
		      )
		}
		</div>
	)	
    }
})
var WagerAccordion = React.createClass ({
    render: function() {
	return (<div class="wager">
		<div>
		  Date: {this.props.wager_date} Id: {this.props.ext_id} Win: {this.props.win_amount}
		</div>
		<div >
		  <EventTable events={this.props.events}/>
		</div>
		</div>)
    }
})


var EventTable = React.createClass({
  render: function() {
    var eventRows = _.map(this.props.events, function(e,i) {return <EventRow event={e} row_id={i+1}/>})
    console.log(eventRows)
    return (
      <table>
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
      </table>)
  }
})

var EventRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.row_id} </td>
                <td>{this.props.event.home_team} - {this.props.event.away_team}</td>
                <td>{this.props.event.home_score} - {this.props.event.away_score}</td>
                <td>{(this.props.event.choose_home) ? "1" : ""} {(this.props.event.choose_tie) ? "X" : ""} {(this.props.event.choose_away) ? "2" : ""}</td>
                <td>{this.props.event.author}</td>
            </tr>
        );
    }
});


React.render(<WagerArray/>, document.getElementById("surprise"))  

