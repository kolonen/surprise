var React = require('react')
var ReactDOM = require("react-dom");
var RB = require('react-bootstrap')
var $ = require('jquery')

module.exports = React.createClass({
  refreshData: function() {
    var name = ReactDOM.findDOMNode(this.refs.userName).value;
    var passwd = ReactDOM.findDOMNode(this.refs.passWord).value;
    var credentials = { username: name , password: passwd }
    $.ajax({
      type: "POST",
      url: "http://localhost:80/surprise/refresh",
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
        <RB.Button type="button" onClick = {this.refreshData} >
          Go!
        </RB.Button>
      </RB.Navbar.Form>
    )}
})
