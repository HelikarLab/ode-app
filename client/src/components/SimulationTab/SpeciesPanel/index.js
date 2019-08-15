import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Table } from 'reactstrap'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import CustomSwitch from './CustomSwitch'

const CSlider = Slider.createSliderWithTooltip(Slider)

function SpeciesPanel() {
  const { species, icstep, icmin, icmax } = useStoreState(
    state => state.simulationTab
  )

  const { toggleSpecie, updateIc } = useStoreActions(
    actions => actions.simulationTab
  )

  return (
    <React.Fragment>
      <h4 className="text-muted" style={{ marginBottom: 20 }}>
        Species
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
            {species.map(specie => (
              <tr key={specie.id}>
                <th>{specie.id}</th>
                <th>
                  <CSlider
                    style={{ width: 200 }}
                    step={icstep}
                    min={icmin}
                    max={icmax}
                    onChange={value => {
                      updateIc({
                        id: specie.id,
                        initialConcentration: value,
                      })
                    }}
                  />
                </th>
                <th>
                  <CustomSwitch specieId={specie.id} toggle={toggleSpecie} />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  )
}

export default SpeciesPanel
