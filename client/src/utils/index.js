export const generateReactionNodes = reactions => {
  const reactionNodes = reactions.map(reaction => {
    return {
      label: reaction.id,
      style: 'reactionNode',
    }
  })
  return reactionNodes
}

export const findNode = (object, nodes) => {
  let temp
  nodes.filter((node, index) => {
    if (node.label === object.label) {
      return (temp = index)
    }
  })
  return temp
}

export const generateReactionEdges = (reactions, nodes) => {
  const reactionsEdges = []
  reactions.map(reaction => {
    reaction.reactants.map(reactant => {
      if (reaction.reversible) {
        return reactionsEdges.push({
          source: nodes[findNode({ label: reactant }, nodes)],
          target: nodes[findNode({ label: reaction.id }, nodes)],
          style: 'reversibleReactantEdge',
        })
      } else {
        return reactionsEdges.push({
          source: nodes[findNode({ label: reactant }, nodes)],
          target: nodes[findNode({ label: reaction.id }, nodes)],
          style: 'reactantEdge',
        })
      }
    })
    return reaction.products.map(product => {
      if (reaction.reversible) {
        return reactionsEdges.push({
          source: nodes[findNode({ label: reaction.id }, nodes)],
          target: nodes[findNode({ label: product }, nodes)],
          style: 'reversibleProductEdge',
        })
      } else {
        return reactionsEdges.push({
          source: nodes[findNode({ label: reaction.id }, nodes)],
          target: nodes[findNode({ label: product }, nodes)],
          style: 'productEdge',
        })
      }
    })
  })
  return reactionsEdges
}
