
import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class SpeciesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      species: []
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.species !== this.props.species) {
      this.setState({ species: this.props.species })
    }
  }
  render () {
    const { species } = this.state
    const tableData = species.map(specie => {
      return (<tr key={specie.id}>
        <th scope='row'>{specie.id}</th>
        <td>{specie.name}</td>
        <td>{specie.compartment}</td>
        <td>{String(specie.initialConcentration)}</td>
      </tr>)
    })
    return (
      <div>
        <h3 style={{ marginTop: 20 }}>Species</h3>
        <div style={{ height: '250px', overflowY: 'scroll', width: '650px' }}>
          <Table borderless>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Compartment</th>
                <th>Initial Concentration</th>
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
    species: state.data.model.species
  }
}

export default connect(mapStateToProps, {})(SpeciesList)
