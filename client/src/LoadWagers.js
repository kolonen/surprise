const React = require('react')
const ReactDOM = require("react-dom");
const RB = require('react-bootstrap')
const http = require('axios')

const baseUrl = require('./Config.js').baseUrl

module.exports = React.createClass({
  loadWagers: function() {
    const username = ReactDOM.findDOMNode(this.refs.userName).value;
    const password = ReactDOM.findDOMNode(this.refs.passWord).value;
    const credentials = { username: username , password: password }

    http.
      post(baseUrl + "/surprise/loadwagers", JSON.stringify(credentials)).
      then(r => {
        console.log("Got "+r.data.loadedWagers+" wagers. Saved "+r.data.savedWagers +" new ones.")
        alert("Got "+r.data.loadedWagers+" wagers. \nSaved "+r.data.savedWagers +" new ones.")
        this.props.reload()
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
