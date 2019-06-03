
import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class ReactionsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      reactions: []
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.reactions !== this.props.reactions) {
      this.setState({ reactions: this.props.reactions })
    }
  }
  render () {
    const { reactions } = this.state
    const tableData = reactions.map(reaction => {
      return (<tr key={reaction.id}>
        <th scope='row'>{reaction.id}</th>
        <td>{reaction.name}</td>
        <td>{String(reaction.reversible)}</td>
      </tr>)
    })
    return (
      <div>
        <h3 style={{ marginTop: 20 }}>Reactions</h3>
        <div style={{ height: '250px', overflowY: 'scroll', width: '650px' }}>
          <Table borderless>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Reversible</th>
              </tr>
            </thead>
            <tbody>
              {tableData}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    reactions: state.data.model.reactions
  }
}

export default connect(mapStateToProps, {})(ReactionsList)
