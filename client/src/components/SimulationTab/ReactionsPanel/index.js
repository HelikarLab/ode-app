import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Card, CardBody, CustomInput, Input, Table } from 'reactstrap'

function ReactionsPanel() {
  const reactions = useStoreState(
    state => state.modelTab.currentModel.reactions
  )

  const { switchReaction, setRatelaw } = useStoreActions(
    actions => actions.simulationTab
  )

  return (
    <Card>
      <CardBody>
        <h4 className="text-muted" style={{ marginBottom: 20 }}>
          Reactions
        </h4>
        <div style={{ overflowY: 'auto', maxHeight: 200 }}>
          <Table borderless hover>
            <thead>
              <tr>
                <th>Toggle</th>
                <th>Reaction String</th>
                <th>Ratelaw</th>
              </tr>
            </thead>
            <tbody>
              {reactions.map(reaction => (
                <tr key={reaction.id}>
                  <th>
                    <CustomInput
                      type="switch"
                      id={reaction.id}
                      onChange={() => {
                        switchReaction(reaction)
                      }}
                    />
                  </th>

                  <th>
                    {reaction.id}: {reaction.reactionString}
                  </th>
                  <th>
                    <Input
                      onChange={e =>
                        setRatelaw({ id: reaction.id, ratelaw: e.target.value })
                      }
                      type="select"
                    >
                      <option value="">Global Ratelaw</option>
                      <option value="rl1">Ratelaw 1</option>
                      <option value="rl2">Ratelaw 2</option>
                      <option value="rl3">Ratelaw 3</option>
                    </Input>
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

export default ReactionsPanel
