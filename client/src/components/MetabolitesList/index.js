import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'

class MetabolitesList extends React.Component {
  state = {
    metabolites: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.metabolites !== this.props.metabolites) {
      this.setState({ metabolites: this.props.metabolites })
    }
  }
  render() {
    const { metabolites } = this.state
    const tableData = metabolites.map(metabolite => {
      return (
        <tr key={metabolite.id}>
          <th scope="row">{metabolite.id}</th>
          <td>{metabolite.name}</td>
          <td>{metabolite.compartment}</td>
          <td>{String(metabolite.initialConcentration)}</td>
        </tr>
      )
    })
    return (
      <div>
        <h3 style={{ marginTop: 20 }}>Metabolites</h3>
        <div style={{ height: '250px', overflowY: 'scroll', width: '650px' }}>
          <Table borderless>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Initial Concentration</th>
              </tr>
            </thead>
            <tbody>{tableData}</tbody>
          </Table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    metabolites: state.data.model.metabolites,
  }
}

export default connect(
  mapStateToProps,
  {}
)(MetabolitesList)
