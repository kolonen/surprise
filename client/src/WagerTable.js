const React = require('react');
const Table = require('react-bootstrap').Table

const WagerRow = require('./WagerRow.js')

module.exports = React.createClass ({
  render: function() {
    const wagerRows = this.props.wagers.map((w, i) => (
      <WagerRow
      handleClick = {this.props.handleClick}
      selected = {this.props.selected==i ? true : false}
      wager_date={w.wager_date}
      ext_id={w.ext_id}
      system={w.system}
      hits={w.hits}
      win_amount={w.win_amount}
      manager={w.manager}
      index={i}
      key={i}
      />
    ))
    return (
      <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Id</th>
              <th>System</th>
              <th>Hits</th>
              <th>Winning</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>{wagerRows}</tbody>
        </Table>)
      }
})
