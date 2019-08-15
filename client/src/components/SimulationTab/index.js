import React from 'react'
import SettingsPanel from './SettingsPanel'
import Plot from './Plot'
import SpeciesPanel from './SpeciesPanel'
import ReactionsPanel from './ReactionsPanel'
import { Responsive, WidthProvider } from 'react-grid-layout'
import './style.scss'

const ResponsiveGridLayout = WidthProvider(Responsive)

function SimulationTab() {
  let layouts = {
    lg: [
      { i: 'settings', x: 0, y: 0, w: 3, h: 7, minW: 3, minH: 7 },
      { i: 'species', x: 3, y: 0, w: 4, h: 7, minW: 4, minH: 7 },
      { i: 'plot', x: 7, y: 0, w: 5, h: 14, minW: 5, minH: 14 },
      { i: 'reactions', x: 0, y: 8, w: 7, h: 6, minW: 7, minH: 7 },
    ],
    md: [
      { i: 'settings', x: 0, y: 0, w: 3, h: 7, minW: 3, minH: 7 },
      { i: 'species', x: 3, y: 0, w: 4, h: 7, minW: 4, minH: 7 },
      { i: 'plot', x: 7, y: 0, w: 5, h: 15, minW: 5, minH: 14 },
      { i: 'reactions', x: 0, y: 8, w: 7, h: 6, minW: 7, minH: 7 },
    ],
    sm: [
      { i: 'settings', x: 0, y: 0, w: 3, h: 7, minW: 3, minH: 7 },
      { i: 'species', x: 3, y: 0, w: 4, h: 7, minW: 4, minH: 7 },
      { i: 'plot', x: 7, y: 0, w: 5, h: 15, minW: 5, minH: 14 },
      { i: 'reactions', x: 0, y: 8, w: 7, h: 6, minW: 7, minH: 7 },
    ],
    xs: [
      { i: 'settings', x: 0, y: 0, w: 3, h: 7, minW: 3, minH: 7 },
      { i: 'species', x: 3, y: 0, w: 4, h: 7, minW: 4, minH: 7 },
      { i: 'plot', x: 7, y: 0, w: 5, h: 15, minW: 5, minH: 14 },
      { i: 'reactions', x: 0, y: 8, w: 7, h: 6, minW: 7, minH: 7 },
    ],
    xss: [
      { i: 'settings', x: 0, y: 0, w: 3, h: 7, minW: 3, minH: 7 },
      { i: 'species', x: 3, y: 0, w: 4, h: 7, minW: 4, minH: 7 },
      { i: 'plot', x: 7, y: 0, w: 5, h: 15, minW: 5, minH: 14 },
      { i: 'reactions', x: 0, y: 8, w: 7, h: 6, minW: 7, minH: 7 },
    ],
  }
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={40}
      items={4}
      onLayoutChange={() => {}}
      draggableCancel=".nonDraggableArea"
    >
      <div key="settings">
        <SettingsPanel />
      </div>
      <div key="species">
        <SpeciesPanel />
      </div>
      <div key="plot">
        <Plot />
      </div>
      <div key="reactions">
        <ReactionsPanel />
      </div>
    </ResponsiveGridLayout>
  )
}

export default SimulationTab
