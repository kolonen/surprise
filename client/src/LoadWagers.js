var React = require('react')
var ReactDOM = require("react-dom");
var RB = require('react-bootstrap')
var $ = require('jquery')

module.exports = React.createClass({
  loadWagers: function() {
    var username = ReactDOM.findDOMNode(this.refs.userName).value;
    var password = ReactDOM.findDOMNode(this.refs.passWord).value;
    var credentials = { username: username , password: password }
    $.ajax({
      type: "POST",
      url: "http://localhost:80/surprise/loadwagers",
      data:  JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      success: function(r) {
        console.log(r.loadedwagers);
        alert("Nrof loaded wagers: "+r.loadedwagers)
      }
    })
  },
  render: function() {
    return (
      <RB.Navbar.Form inline>
        Load wagers:{' '}
        <RB.FormGroup controlId="formInlineName">
          <RB.FormControl type="text" placeholder="Username..." ref = 'userName' />
          {' '}
          <RB.FormControl type="password" placeholder="Password..." ref = 'passWord' />
        </RB.FormGroup>
        {' '}{' '}
        <RB.Button type="button" onClick = {this.loadWagers} >
          Go!
        </RB.Button>
      </RB.Navbar.Form>
    )}
})
