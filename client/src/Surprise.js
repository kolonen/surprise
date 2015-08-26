
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
		{
		    _.map(this.state.wagers, 
		       function(w) {return <Wager wager_date={w.wager_date} ext_id={w.ext_id} win_amount ={w.win_amount}/>}
		      )
		}
		</div>
	)	
    }
})
var Wager = React.createClass ({
    
    render: function() {
	return (<div>{this.props.wager_date}, {this.props.ext_id}, {this.props.win_amount}</div>)
    }
})


React.render(<Surprise/>, document.getElementById("surprise"))  
