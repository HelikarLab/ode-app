import React from 'react'
import Chart from 'react-apexcharts'
import { useStoreState } from 'easy-peasy'
import { WidthProvider } from 'react-grid-layout'

function Plot(props) {
  const data = useStoreState(state => state.simulationTab)
  const modelMetadata = useStoreState(state => state.modelMetadata)

  React.useEffect(() => {
    let newReactions = []
    data.reactions.forEach(reaction => {
      if (reaction.checked === true) {
        if (reaction.ratelaw === '') {
          newReactions.push({ ...reaction, ratelaw: data.globalRatelaw })
        } else newReactions.push(reaction)
      }
    })
    const modelData = {
      ...modelMetadata,
      reactions: newReactions,
      metabolites: data.metabolites,
    }
    const dataString =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(modelData))
    const exportAnchorElement = document.getElementById('exportAnchorElement')
    exportAnchorElement.setAttribute('href', dataString)
    exportAnchorElement.setAttribute('download', 'model.json')
  })

  let width
  React.useEffect(() => {
    // eslint-disable-next-line
    width = (props.width * 35) / 100
  }, [props.width])

  if (data.graphData) {
    return (
      <div>
        <Chart
          options={{
            chart: {
              id: 'apexchart-example',
            },
            xaxis: {
              type: 'numeric',
              tickAmount: 10,
            },
          }}
          series={data.graphData}
          type="line"
          width={width}
          height={600}
        />
        <a
          className="btn btn-dark"
          style={{ float: 'right' }}
          id="exportAnchorElement"
          href="/"
        >
          Export Data
        </a>
      </div>
    )
  } else return <div />
}

export default WidthProvider(Plot)
