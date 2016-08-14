const React = require('react')
const ReactDOM = require("react-dom");
const RB = require('react-bootstrap')
const http = require('axios')

const baseUrl = require('./Config.js').baseUrl

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  clearInput() {
    this.setState({
      username: '',
      password: ''
    })
  },
  handleChange() {
    this.setState({
      username: this.refs.userName.getValue,
      password: this.refs.passWord.getValue
    });
  },
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
        this.clearInput()
      })
  },
  render: function() {
    return (
      <RB.Navbar.Form inline>
        Load wagers:{' '}
        <RB.FormGroup controlId="formInlineName">
          <RB.FormControl value={this.state.username} onChange={this.handleChange} type="text" placeholder="Username..." ref = 'userName' />
          {' '}
          <RB.FormControl value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password..." ref = 'passWord' />
        </RB.FormGroup>
        {' '}{' '}
        <RB.Button type="button" onClick = {this.loadWagers} >
          Go!
        </RB.Button>
      </RB.Navbar.Form>
    )}
})
