import React from 'react'
import { useStoreState } from 'easy-peasy'
import { Row, Col, Button } from 'reactstrap'
import Graph from '../Graph'
import ReactionsList from '../ReactionsList'
import MetabolitesList from '../MetabolitesList'
import InfoPanel from '../InfoPanel'

function ModelTab() {
  const [type, setType] = React.useState('')
  const [info, setInfo] = React.useState({})

  const { reactions, metabolites, name } = useStoreState(
    state => state.currentModel
  )

  return (
    <Row style={{ padding: 20 }}>
      <Col md="5">
        <Graph reactions={reactions} metabolites={metabolites} />
      </Col>
      <Col md="7">
        <Row>
          <Col>
            <ReactionsList
              reactions={reactions}
              setInfo={setInfo}
              setType={setType}
            />
          </Col>
          <Col>
            <MetabolitesList
              metabolites={metabolites}
              setInfo={setInfo}
              setType={setType}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col>
            <InfoPanel type={type} data={info} />
          </Col>
        </Row>
        <Row>
          <Button
            color="primary"
            // onClick={() => props.saveModel()}
            disabled={name ? false : true}
          >
            Save Model
          </Button>
        </Row>
      </Col>
    </Row>
  )
}

export default ModelTab
