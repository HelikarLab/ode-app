import React from 'react'
import NetViz from 'ccnetviz'
import { connect } from 'react-redux'

class Graph extends React.Component {
  componentDidMount() {
    this.self = new NetViz(this.refs.graph, {
      styles: {
        node: { label: { hideSize: 16 } }
      }
    })
  }

  componentDidUpdate(prevProps) {
    const { species } = this.props
    if (prevProps.species !== species) {
      const nodes = species
      const edges = [
        { source: nodes[0], target: nodes[1] },
        { source: nodes[1], target: nodes[2] },
        { source: nodes[2], target: nodes[1] }
      ]
      nodes.map(specie => (specie.label = specie.id))
      this.self.set(nodes, edges, 'force')
      this.self.draw()
    }
  }

  render() {
    return (
      <div>
        <h3>Graph</h3>
        <canvas ref="graph" width="600" height="550" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    species: state.data.model.species
  }
}

export default connect(
  mapStateToProps,
  {}
)(Graph)
