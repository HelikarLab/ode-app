import React from 'react'
import ccNetViz from 'ccnetviz'
import { UncontrolledTooltip } from 'reactstrap'
import { Icon } from 'react-icons-kit'
import { infoCircle } from 'react-icons-kit/fa/infoCircle'
import GraphLegend from './GraphLegend'
import './style.scss'

class Graph extends React.Component {
  state = {
    nodes: [],
    edges: [],
  }

  gen = () => {
    const { reactions, metabolites } = this.props
    try {
      let reactionNodes = this.generateReactionNodes(reactions)
      let nodes = []
      for (let i = 0; i < metabolites.length; i++) {
        nodes.push({ label: metabolites[i].id })
      }
      reactionNodes.map(node => {
        return nodes.push(node)
      })
      let edges = this.generateReactionEdges(reactions, nodes)
      this.setState({ nodes, edges })
    } catch {}
  }

  generateReactionNodes = reactions => {
    const reactionNodes = reactions.map(reaction => {
      return {
        label: reaction.id,
        style: 'reactionNode',
      }
    })
    return reactionNodes
  }

  findNode = (object, nodes) => {
    let temp
    nodes.filter((node, index) => {
      if (node.label === object.label) {
        return (temp = index)
      } else {
        return false
      }
    })
    return temp
  }

  generateReactionEdges = (reactions, nodes) => {
    const reactionsEdges = []
    reactions.map(reaction => {
      reaction.reactants.map(reactant => {
        if (reaction.reversible) {
          return reactionsEdges.push({
            source: nodes[this.findNode({ label: reactant.id }, nodes)],
            target: nodes[this.findNode({ label: reaction.id }, nodes)],
            style: 'reversibleReactantEdge',
          })
        } else {
          return reactionsEdges.push({
            source: nodes[this.findNode({ label: reactant.id }, nodes)],
            target: nodes[this.findNode({ label: reaction.id }, nodes)],
            style: 'reactantEdge',
          })
        }
      })
      return reaction.products.map(product => {
        if (reaction.reversible) {
          return reactionsEdges.push({
            source: nodes[this.findNode({ label: reaction.id }, nodes)],
            target: nodes[this.findNode({ label: product.id }, nodes)],
            style: 'reversibleProductEdge',
          })
        } else {
          return reactionsEdges.push({
            source: nodes[this.findNode({ label: reaction.id }, nodes)],
            target: nodes[this.findNode({ label: product.id }, nodes)],
            style: 'productEdge',
          })
        }
      })
    })
    return reactionsEdges
  }

  componentDidMount() {
    this.graph = new ccNetViz(document.getElementById('graph'), {
      styles: {
        background: {
          color: 'rgb(255, 255, 255)',
        },
        node: {
          minSize: 6,
          maxSize: 16,
          color: 'rgb(47, 109, 206)',
          texture: require('../../../assets/node.png'),
          label: {
            color: 'rgb(0, 0, 0)',
            hideSize: 16,
          },
        },
        edge: {
          width: 1,
          color: 'rgb(50, 50, 50)',
          arrow: {
            minSize: 1,
            maxSize: 16,
            aspect: 1,
            texture: require('../../../assets/arrow.png'),
            hideSize: 1,
          },
          type: 'line',
        },
        reactionNode: {
          color: 'rgb(200, 0, 0)',
          label: {
            hideSize: 16,
          },
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
      onChangeViewport: function(viewport) {},
      onLoad: function() {},
      getNodesCount() {},
      getEdgesCount() {},
      onDrag: function(viewport) {},
      onZoom: function(viewport) {},
      onClick: function() {
        return false
      },
      onDblClick: function() {},
      passiveEvts: true,
    })

    this.gen()
    this.graph.set(this.state.nodes, this.state.edges, 'force')
    this.graph.draw()
  }

  componentDidUpdate(prevProps, prevState) {
    this.graph.draw()
    if (
      prevProps.reactions !== this.props.reactions ||
      prevProps.metabolites !== this.props.metabolites
    ) {
      this.gen()
    }
    if (prevState !== this.state) {
      this.graph.set(this.state.nodes, this.state.edges, 'force')
      this.graph.draw()
    }
  }

  componentWillUnmount() {
    this.graph.remove()
  }

  render() {
    return (
      <div>
        <h4 className="text-muted">
          Graph{` `}
          <Icon icon={infoCircle} id="graph-legend-info" />
          <UncontrolledTooltip placement="right" target="graph-legend-info">
            <GraphLegend />
          </UncontrolledTooltip>
        </h4>
        <canvas id="graph" width="600" height="550" className="graph-canvas" />
      </div>
    )
  }
}

export default Graph
