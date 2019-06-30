import React from 'react'
import SettingsPanel from './SettingsPanel'
import Plot from './Plot'
import MetabolitesPanel from './MetabolitesPanel'
import ReactionsPanel from './ReactionsPanel'
import GridLayout from 'react-grid-layout'

function SimulationTab() {
  let layout = [
    { i: 'a', x: 0, y: 0, w: 3, h: 7 },
    { i: 'b', x: 3, y: 0, w: 4, h: 7 },
    { i: 'c', x: 7, y: 0, w: 5, h: 15 },
    { i: 'd', x: 0, y: 8, w: 7, h: 6 },
  ]
  return (
    <GridLayout
      isDraggable={false}
      className="layout"
      layout={layout}
      cols={12}
      items={4}
      rowHeight={40}
      width={1500}
      onLayoutChange={() => {}}
      autoSize={false}
    >
      <div key="a">
        <SettingsPanel />
      </div>
      <div key="b">
        <MetabolitesPanel />
      </div>
      <div key="c">
        <Plot />
      </div>
      <div key="d">
        <ReactionsPanel />
      </div>
    </GridLayout>
  )
}

export default SimulationTab
