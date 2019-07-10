import React from 'react'
import Chart from 'react-apexcharts'
import { useStoreState } from 'easy-peasy'

function Plot() {
  const data = useStoreState(state => state.simulationTab)
  if (data.graphData) {
    return (
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
        width={550}
        height={600}
      />
    )
  } else return <div />
}

export default Plot
