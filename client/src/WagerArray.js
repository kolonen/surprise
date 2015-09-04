var Table = ReactBootstrap.Table


var MainSurprise = React.createClass({
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
	<div className="container">
  
	  <div className="row">
	    <div className="col-md-6">
	      <WagerTable wagers={this.state.wagers} handleRowClick={this.handleRowClick}/>
           </div>
	   <div className="col-md-6">        
	      <EventTable events={this.state.wagers[this.state.selected] != undefined ? this.state.wagers[this.state.selected].events : []}/>
           </div>
          </div>
        </div>) 
}
})

var WagerTable = React.createClass ({
    render: function() {
	console.log(this.props.wagers)
	var handleClick = this.props.handleRowClick
	var wagerRows = _.map(this.props.wagers, function(w, i) {
	    return (<WagerRow handleRowClick={handleClick} wager_date={w.wager_date} ext_id={w.ext_id} system={w.system} hits={w.hits} win_amount={w.win_amount} index={i} key={i}/>)
	})
	return (
	<Table striped>
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
var WagerRow = React.createClass ({
    handleClick: function () {
	this.props.handleRowClick(this.props.index)
    },
    render: function() {
	console.log(this.props.kkey)
	return (<tr onClick={this.handleClick}>
		<td>{this.props.wager_date}</td>
		<td>{this.props.ext_id}</td>
		<td>{this.props.system}</td>
		<td>{this.props.hits}</td>
		<td>{this.props.win_amount}</td>
	       </tr>)
    }
})

var EventTable = React.createClass({
  render: function() {
    var eventRows = _.map(this.props.events, function(e,i) {return <EventRow event={e} row_id={i+1}/>})
    console.log(eventRows)
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

var EventRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.row_id} </td>
                <td>{this.props.event.home_team} - {this.props.event.away_team}</td>
                <td>{this.props.event.home_score} - {this.props.event.away_score}</td>
                <td>{(this.props.event.choose_home==1) && ((this.props.event.home_score > this.props.event.away_score) ? <kbd>1</kbd> : 1)}{(this.props.event.choose_home==1) && "\u00a0"}
                {(this.props.event.choose_tie==1) && ((this.props.event.home_score == this.props.event.away_score) ? <kbd>X</kbd> : "X")}{(this.props.event.choose_tie==1) && "\u00a0"}
                {(this.props.event.choose_away==1) && ((this.props.event.home_score < this.props.event.away_score) ? <kbd>2</kbd> : 2)}
                </td>
                <td>{this.props.event.author}</td>
            </tr>
        );
    }
});


React.render(<MainSurprise/>, document.getElementById("surprise"))  
