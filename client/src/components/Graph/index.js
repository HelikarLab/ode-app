import React from 'react'
import NetViz from 'ccnetviz'
import { connect } from 'react-redux'
import { generateReactionNodes, generateReactionEdges } from '../../utils'
class Graph extends React.Component {
  state = {
    nodes: [],
    edges: [],
  }

  componentDidMount() {
    this.self = new NetViz(this.refs.graph, {
      styles: {
        background: {
          color: 'rgb(255, 255, 255)',
        },
        node: {
          minSize: 6,
          maxSize: 16,
          color: 'rgb(47, 109, 206)',
          texture: require('../../assets/circle.png'),
          label: {
            color: 'rgb(0, 0, 0)',
          },
        },
        edge: {
          width: 1,
          color: 'rgb(50, 50, 50)',
          arrow: {
            minSize: 1,
            maxSize: 16,
            aspect: 1,
            texture: require('../../assets/arrow.png'),
            hideSize: 1,
          },
          type: 'line',
        },
        reactionNode: {
          color: 'rgb(200, 0, 0)',
        },
        reactantEdge: {
          color: 'rgb(89, 249, 2)',
        },
        productEdge: {
          color: 'rgb(255, 246, 0)',
        },
        reversibleReactantEdge: { color: 'rgb(89, 249, 2)', type: 'dashed' },
        reversibleProductEdge: { color: 'rgb(255, 246, 0)', type: 'dashed' },
      },
      onChangeViewport: function(viewport) {}, //called every time viewport changes
      onLoad: function() {}, //called when graph loaded
      getNodesCount() {}, //callback to use if you want to force nodes count into this library (used to calculate curve excentricity and other built in options), expecting number as return value
      getEdgesCount() {}, //callback to use if you want to force edges count into this library (used to calculate curve excentricity and other built in options), expecting number as return value
      onDrag: function(viewport) {}, //drag event, disable original event in case of return false
      onZoom: function(viewport) {}, //zoom event, disable original event in case of return false
      onClick: function() {
        return false
      }, //called on click on graph
      onDblClick: function() {}, //called on double click on graph,
      passiveEvts: true,
    })
    // this.self.set(temp, temp2, 'force')
    // this.self.draw()
  }

  async componentDidUpdate(prevProps, prevState) {
    const { metabolites } = this.props
    if (
      prevProps.reactions !== this.props.reactions ||
      prevProps.metabolites !== this.props.metabolites
    ) {
      let reactionNodes = generateReactionNodes(this.props.reactions)
      let nodes = []
      for (let i = 0; i < metabolites.length; i++) {
        nodes.push({ label: metabolites[i].id })
      }
      reactionNodes.map(node => {
        return nodes.push(node)
      })
      let edges = generateReactionEdges(this.props.reactions, nodes)
      this.setState({ nodes, edges })
    }
    if (prevState !== this.state) {
      const nodes = this.state.nodes
      const edges = this.state.edges
      this.self.set(nodes, edges, 'force')
      this.self.draw()
    }
  }

  render() {
    return (
      <div>
        <h3>Graph</h3>
        <div
          style={{
            border: '2px black solid',
            height: 570,
            width: 620,
            margin: 20,
          }}
        >
          <canvas ref="graph" width="600" height="550" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    metabolites: state.data.model.metabolites,
    reactions: state.data.model.reactions,
  }
}

export default connect(
  mapStateToProps,
  {}
)(Graph)
