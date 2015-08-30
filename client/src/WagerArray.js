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
		       function(w) {return <WagerAccordion wager_date={w.wager_date} ext_id={w.ext_id} win_amount ={w.win_amount}/>}
		      )
		}
		</div>
	)	
    }
})
var WagerAccordion = React.createClass ({
    
    render: function() {
	return (<div class="wager">
		Date: {this.props.wager_date} Id: {this.props.ext_id} Win: {this.props.win_amount}
		
		</div>)
    }
})



React.render(<WagerArray/>, document.getElementById("surprise"))  

