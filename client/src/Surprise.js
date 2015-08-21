
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
	    console.log(r)
	}.bind(this));
    },
    render: function() {
        return (<div>Surprise Surprise {this.state.wagers}</div>)
    }
})

React.render(<Surprise/>, document.getElementById("surprise"))  
