import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Card, CardBody, Table } from 'reactstrap'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import CustomSwitch from './CustomSwitch'

const CSlider = Slider.createSliderWithTooltip(Slider)

function MetabolitesPanel() {
  const { metabolites, icstep, icmin, icmax } = useStoreState(
    state => state.simulation
  )

  const toggleMetabolite = useStoreActions(actions => actions.toggleMetabolite)

  const updateIc = useStoreActions(actions => actions.updateIc)

  return (
    <Card>
      <CardBody>
        <h4 className="text-muted" style={{ marginBottom: 20 }}>
          Metabolites
        </h4>
        <div style={{ overflowY: 'scroll', height: 255 }}>
          <Table borderless>
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
      </CardBody>
    </Card>
  )
}

export default MetabolitesPanel
