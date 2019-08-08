import React from 'react'
import SettingsPanel from './SettingsPanel'
import Plot from './Plot'
import MetabolitesPanel from './MetabolitesPanel'
import ReactionsPanel from './ReactionsPanel'
// import GridLayout from 'react-grid-layout'
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'

function SimulationTab() {
  let layout = {
    lg: [
      { i: 'a', x: 0, y: 0, w: 3, h: 7 },
      { i: 'b', x: 3, y: 0, w: 4, h: 7 },
      { i: 'c', x: 7, y: 0, w: 5, h: 15 },
      { i: 'd', x: 0, y: 8, w: 7, h: 6 },
    ],
    md: [
      { i: 'a', x: 0, y: 0, w: 3, h: 7 },
      { i: 'b', x: 3, y: 0, w: 4, h: 7 },
      { i: 'c', x: 7, y: 0, w: 5, h: 15 },
      { i: 'd', x: 0, y: 8, w: 7, h: 6 },
    ],
    sm: [
      { i: 'a', x: 0, y: 0, w: 3, h: 7 },
      { i: 'b', x: 3, y: 0, w: 4, h: 7 },
      { i: 'c', x: 7, y: 0, w: 5, h: 15 },
      { i: 'd', x: 0, y: 8, w: 7, h: 6 },
    ],
    xs: [
      { i: 'a', x: 0, y: 0, w: 3, h: 7 },
      { i: 'b', x: 3, y: 0, w: 4, h: 7 },
      { i: 'c', x: 7, y: 0, w: 5, h: 15 },
      { i: 'd', x: 0, y: 8, w: 7, h: 6 },
    ],
    xss: [
      { i: 'a', x: 0, y: 0, w: 3, h: 7 },
      { i: 'b', x: 3, y: 0, w: 4, h: 7 },
      { i: 'c', x: 7, y: 0, w: 5, h: 15 },
      { i: 'd', x: 0, y: 8, w: 7, h: 6 },
    ],
  }
  return (
    <ResponsiveGridLayout
      isDraggable={false}
      className="layout"
      layout={layout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} // items={4}
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
    </ResponsiveGridLayout>
  )
}

export default SimulationTab
