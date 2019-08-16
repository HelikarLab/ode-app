import React from 'react'
import ccNetViz from 'ccnetviz'
import _ from 'lodash'
import { WidthProvider } from 'react-grid-layout'
import {
  UncontrolledTooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap'
import { Icon } from 'react-icons-kit'
import { infoCircle } from 'react-icons-kit/fa/infoCircle'
import GraphLegend from './GraphLegend'
import './style.scss'

class Graph extends React.Component {
  state = {
    nodes: [],
    edges: [],
    compartments: [],
    currentCompartment: 'all',
    dropdown: false,
    canvasWidth: 0,
  }

  toggle = () => {
    this.setState({ dropdown: !this.state.dropdown })
  }

  selectCompartment = compartment => {
    this.setState({ currentCompartment: compartment })
  }

  gen = () => {
    const { reactions, species, compartments } = this.props
    const { currentCompartment } = this.state
    this.setState({ compartments })
    try {
      if (currentCompartment === 'all') {
        let reactionNodes = this.generateReactionNodes(reactions)
        let speciesNodes = species.reduce((result, specie) => {
          result.push({ label: specie.id })
          return result
        }, [])
        let nodes = _.concat(reactionNodes, speciesNodes)
        let edges = this.generateReactionEdges(reactions, nodes)
        this.setState({ nodes, edges })
      } else {
        let compartmentReactions = reactions.filter(reaction => {
          if (
            _.includes(reaction.compartments, currentCompartment) &&
            reaction.compartments.length === 1
          ) {
            return true
          } else return false
        })
        let reactionNodes = this.generateReactionNodes(compartmentReactions)
        let specieNodes = species.reduce((result, specie) => {
          if (specie.compartment === currentCompartment) {
            result.push({ label: specie.id })
          }
          return result
        }, [])
        let nodes = _.concat(reactionNodes, specieNodes)
        let edges = this.generateReactionEdges(compartmentReactions, nodes)
        this.setState({ nodes, edges })
      }
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
    this.setState({ compartments: this.props.compartments })
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
    this.graph.set(this.state.nodes, this.state.edges, 'force').then(() => {
      this.graph.draw()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.reactions !== this.props.reactions ||
      prevProps.species !== this.props.species
    ) {
      this.setState({ currentCompartment: 'all' })
    }
    if (
      prevProps.reactions !== this.props.reactions ||
      prevProps.species !== this.props.species ||
      prevState.currentCompartment !== this.state.currentCompartment
    ) {
      this.gen()
    }
    if (
      prevState.nodes !== this.state.nodes ||
      prevState.edges !== this.state.edges
    ) {
      this.graph.set(this.state.nodes, this.state.edges, 'force').then(() => {
        this.graph.draw()
      })
    }
    if (prevProps.width !== this.props.width) {
      this.setState({ canvasWidth: this.props.width })
    }
  }

  componentWillUnmount() {
    this.graph.remove()
  }

  render() {
    const { compartments, canvasWidth } = this.state
    return (
      <div>
        <h4 className="text-muted">
          Graph{` `}
          <Icon icon={infoCircle} id="graph-legend-info" />
          <UncontrolledTooltip placement="right" target="graph-legend-info">
            <GraphLegend />
          </UncontrolledTooltip>
        </h4>
        <Dropdown isOpen={this.state.dropdown} toggle={this.toggle}>
          <DropdownToggle data-test="compartment-button" color="success">
            Compartments
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                this.selectCompartment('all')
              }}
            >
              All
            </DropdownItem>
            {compartments.map(compartment => (
              <DropdownItem
                key={compartment.id}
                onClick={() => {
                  this.selectCompartment(compartment.id)
                }}
              >
                {compartment.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <br />
        <canvas
          id="graph"
          width={canvasWidth}
          height="550"
          className="nonDraggableArea"
        />
      </div>
    )
  }
}

export default WidthProvider(Graph)
