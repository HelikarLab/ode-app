import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  CustomInput,
} from 'reactstrap'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const CSlider = Slider.createSliderWithTooltip(Slider)

function MetabolitesPanel() {
  const { metabolites, run, icmin, icmax } = useStoreState(
    state => state.simulation
  )

  const updateIc = useStoreActions(actions => actions.updateIc)

  return (
    <Card>
      <CardBody>
        <h4 className="text-muted" style={{ marginBottom: 20 }}>
          Metabolites
        </h4>
        <ListGroup flush style={{ overflowY: 'auto', maxHeight: 255 }}>
          {metabolites.map(metabolite => (
            <ListGroupItem style={{ display: 'flex' }} key={metabolite.id}>
              {run ? (
                <CustomInput type="checkbox" id={metabolite.id} />
              ) : (
                <React.Fragment />
              )}
              <span style={{ marginRight: 20 }}>{metabolite.id}</span>
              <CSlider
                min={icmin}
                max={icmax}
                onChange={value => {
                  updateIc({ id: metabolite.id, initialConcentration: value })
                }}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  )
}

export default MetabolitesPanel
