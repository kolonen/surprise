var React = require('react')
var ReactDOM = require("react-dom");
var RB = require('react-bootstrap')
var $ = require('jquery')

module.exports = React.createClass({
  LoadWagers: function() {
    var username = ReactDOM.findDOMNode(this.refs.userName).value;
    var password = ReactDOM.findDOMNode(this.refs.passWord).value;
    var credentials = { username: username , password: password }
    $.ajax({
      type: "POST",
      url: "http://localhost:80/surprise/loadwagers",
      data:  JSON.stringify(credentials),
      contentType: "application/json; charset=utf-8",
      success: function(r) { console.log(r) }
      })
  },
  render: function() {
    return (
      <RB.Navbar.Form inline>
        Update wagers:{' '}
        <RB.FormGroup controlId="formInlineName">
          <RB.FormControl type="text" placeholder="Username..." ref = 'userName' />
          {' '}
          <RB.FormControl type="password" placeholder="Password..." ref = 'passWord' />
        </RB.FormGroup>
        {' '}{' '}
        <RB.Button type="button" onClick = {this.LoadWagers} >
          Go!
        </RB.Button>
      </RB.Navbar.Form>
    )}
})
