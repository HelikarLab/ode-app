import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Table } from 'reactstrap'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import CustomSwitch from './CustomSwitch'

const CSlider = Slider.createSliderWithTooltip(Slider)

function MetabolitesPanel() {
  const { metabolites, icstep, icmin, icmax } = useStoreState(
    state => state.simulationTab
  )

  const { toggleMetabolite, updateIc } = useStoreActions(
    actions => actions.simulationTab
  )

  return (
    <React.Fragment>
      <h4 className="text-muted" style={{ marginBottom: 20 }}>
        Metabolites
      </h4>
      <div
        style={{ overflowY: 'auto', height: '90%' }}
        className="nonDraggableArea shadow-inner"
      >
        <Table borderless hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Initial Concentration</th>
              <th>Show in graph</th>
            </tr>
          </thead>
          <tbody>
            {metabolites.map(metabolite => (
              <tr key={metabolite.id}>
                <th>{metabolite.id}</th>
                <th>
                  <CSlider
                    style={{ width: 200 }}
                    step={icstep}
                    min={icmin}
                    max={icmax}
                    onChange={value => {
                      updateIc({
                        id: metabolite.id,
                        initialConcentration: value,
                      })
                    }}
                  />
                </th>
                <th>
                  <CustomSwitch
                    metaboliteId={metabolite.id}
                    toggle={toggleMetabolite}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  )
}

export default MetabolitesPanel
