
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
	//var w = this.state.wagers[0]
	var w = {wager_date: "a", ext_id: "b", win_amount: "c"}
        console.log(_.map(this.state.wagers, function(s) {return s.ext_id}))
	return (
		
		<div><Wager wager_date={w.wager_date} ext_id={w.ext_id} win_amount ={w.win_amount}/></div>
	) 
    }
})
var Wager = React.createClass ({
    
    render: function() {
	return (<div>{this.props.wager_date}, {this.props.ext_id}, {this.props.win_amount}</div>)
    }
})



React.render(<Surprise/>, document.getElementById("surprise"))  
