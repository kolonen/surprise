var Accordion = ReactBootstrap.Accordion;
var Panel = ReactBootstrap.Panel;
var Surprise = React.createClass ({
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
        <Accordion>
		{
		    _.map(this.state.wagers, 
		       function(w, i) {return <Wager events={w.events} event_key={i+1} wager_date={w.wager_date} win_amount ={w.win_amount}/>}
		      )
		}
        </Accordion>
        </div>
	)	
    }
})

var Wager = React.createClass ({
    /* perhaps react-bootstrap Panel & Accordion components could be replaced with component from native bootsrap CSS library */
    render: function() {
	return (<Panel header={"Vakio "+this.props.wager_date+"  Voitto: "+this.props.win_amount} eventKey={this.props.event_key}><EventTable events={this.props.events} /></Panel>)

    }
})

var Row = React.createClass({
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

var EventTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.events.forEach(function(event, i) {
            rows.push(<Row row_id={i+1} event={event} />);
        });
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Ottelu</th>
                        <th>Tulos</th>
                        <th>Merkit</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

React.render(<Surprise/>, document.getElementById("surprise"))  